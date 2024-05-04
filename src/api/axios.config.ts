import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

const API_SERVER_HOST = "https://dev.test.com"

const axiosWithToken = axios.create()

axiosWithToken.defaults.baseURL = API_SERVER_HOST
axiosWithToken.defaults.headers.common["Content-Type"] = "application/json"

const setJwtAxiosHeader = (accessToken: string) => {
  axiosWithToken.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

const refreshJWT = async (accessToken: string, refreshToken: string) => {
  const result = await new Promise((res, rej) => {
    res("delay")
  })
  return { accessToken: "", refreshToken: "" }
}

const onReqFulfilled = (response: AxiosResponse) => {
  return response
}

// 지금 토큰 갱신 중인지
let isRefreshing = false
// 여러개 호출 들어오는 경우 : 모두 토큰 갱신이 필요
const originalRequestsWaiting = [] as {
  url?: string
  resolve: (token: string) => void
  reject: (err: any) => void
}[]
const onReqRejected = (error: any) => {
  console.log(
    "%c interceptors.response ::: error : ",
    "background: black; color: crimson",
    error
  )

  if (axios.isAxiosError(error)) {
    const response = error.response as AxiosResponse<{
      data: any
      code: string
    }>

    if (
      response &&
      response.status === 401 &&
      response.data?.code === "JWT_TOKEN_ERR"
    ) {
      const old_accessToken = sessionStorage.getItem("accessToken")
      const old_refreshToken = sessionStorage.getItem("refreshToken")

      if (!old_refreshToken) return Promise.reject("재 로그인이 필요합니다.")

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean
      }

      // 지금 요청건으 첫 시도인지 체크 :: 재요청건이 아닌데 토큰이 리프레쉬 진행중인경우
      // 토큰 리프레시 중인경우 대기열에 추가함
      if (originalRequest && !originalRequest._retry) {
        if (isRefreshing)
          return new Promise<string>((resolve, reject) => {
            originalRequestsWaiting.push({
              url: originalRequest.url,
              resolve, // 리졸브는 newAccessToken을 넘겨준다.
              reject, // 리젝트는 Error 객체를 넘겨준다.
            })
          })
            .then((newToken) => {
              // === resolve(newAccessToken)
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              return axiosWithToken(originalRequest)
            })
            .catch((err: any) => {
              // === resolve(error)
              return Promise.reject(err)
            })
      }

      const veryFirstOriginalRequest = originalRequest
      // 여기까지 온겨우 두변째 요청임. ::  재요청할 예정이므로
      originalRequest._retry = true
      // 토큰 리프레시 요청 진행
      isRefreshing = true

      // 리프레쉬 토큰 호출 부

      return new Promise((resolve, reject) => {
        refreshJWT(old_accessToken ?? "", old_refreshToken ?? "")
          .then(
            ({
              accessToken: new_accessToken,
              refreshToken: new_refreshToken,
            }) => {
              sessionStorage.setItem("accessToken", new_accessToken)
              sessionStorage.setItem("refreshToken", new_refreshToken)

              axiosWithToken.defaults.headers.common.Authorization = `Bearer ${new_accessToken}`

              // 대기열 요청 처리
              originalRequestsWaiting.forEach((reqPromise) => {
                reqPromise.resolve(new_accessToken)
              })

              // 성공했으니 대기열 비우기
              originalRequestsWaiting.slice(0)

              // 최초의 accessToken 만료를 만난 리퀘스트 처리
              resolve(axiosWithToken(veryFirstOriginalRequest))
            }
          )
          .catch((error: any) => {
            originalRequestsWaiting.forEach((reqPromise) => {
              reqPromise.reject(error)
            })

            // 최초의 accessToken 만료를 만난 리퀘스트 처리
            reject(error)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }
  }
}
axiosWithToken.interceptors.response.use(onReqFulfilled, onReqRejected)

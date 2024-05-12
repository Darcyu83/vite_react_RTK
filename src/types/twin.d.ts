import "twin.macro"
import { css as cssImport } from "@emotion/react"
import styledImport from "@emotion/styled"
import aa from "@emotion/serialize"

declare module "twin.macro" {
  // the Styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module "react" {
  // the tw and css prop
  interface DOMAttributes<T> {
    tw?: string
    css?: CssInterpolation
  }
}

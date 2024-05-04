export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  is_default: boolean
  order: number
  weight: number

  species: {
    name: string
    url: string
  }

  sprites: {
    back_default: string
    back_female: null
    back_shiny: string
    back_shiny_female: null
    front_default: string
    front_female: null
    front_shiny: string
    front_shiny_female: null
  }
}

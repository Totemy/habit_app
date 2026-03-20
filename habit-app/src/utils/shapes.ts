import type { HabitShape } from '../types/Habit'

export interface ShapeDetails {
  svgIcon: string
  label: string
  type: HabitShape
}
export const defaultShapes: ShapeDetails[] = [
  {
    svgIcon: `<circle cx="12" cy="12" r="10" />`,
    label: `circle`,
    type: 'circle',
  },
  {
    svgIcon: `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />`,
    label: `star`,
    type: 'star',
  },
  {
    svgIcon: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />`,
    label: `heart`,
    type: 'heart',
  },
  {
    svgIcon: `<path d="M12 2C8 6 6 10 8 14c-2-1-3-3-3-5C3 14 6 20 12 22c6-2 9-8 7-13-1 2-3 3-5 3 2-2 1-6-2-10z" />`,
    label: `fire`,
    type: 'fire',
  },
  {
    svgIcon: `<polygon points="13,2 4,14 11,14 11,22 20,10 13,10" />`,
    label: `lightning`,
    type: 'lightning',
  },
]

export const SHAPES: Record<HabitShape, string> = {
  circle: `<circle cx="12" cy="12" r="10" />`,
  star: `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />`,
  heart: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />`,
  fire: `<path d="M12 2C8 6 6 10 8 14c-2-1-3-3-3-5C3 14 6 20 12 22c6-2 9-8 7-13-1 2-3 3-5 3 2-2 1-6-2-10z" />`,
  lightning: `<polygon points="13,2 4,14 11,14 11,22 20,10 13,10" />`,
}

export const SHAPE_LABELS: Record<HabitShape, string> = {
  circle: '⬤ Circle',
  star: `${SHAPES.star} Star`,
  heart: `${SHAPES.heart} Heart`,
  fire: `${SHAPES.fire} Fire`,
  lightning: `${SHAPES.lightning} Lightning`,
}

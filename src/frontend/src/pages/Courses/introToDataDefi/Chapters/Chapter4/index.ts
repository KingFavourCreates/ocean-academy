/* eslint import/no-webpack-loader-syntax: off */
// @ts-ignore
import course from 'pages/Courses/introToDataDefi/Chapters/Chapter4/node_modules/!raw-loader!./course.md'

import { Data } from '../../../../Chapter/Chapter.controller'
import { questions } from './questions'

export const data: Data = { course, exercise: undefined, solution: undefined, supports: {}, questions }
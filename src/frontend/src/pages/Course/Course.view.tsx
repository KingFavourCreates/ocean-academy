import * as PropTypes from 'prop-types'
import * as React from 'react'
import { CourseStyled } from './Course.style'

type CourseViewProps = {
    course: string
}

export const CourseView = ({ course }: CourseViewProps) => (
    <>
        {console.log(`[Course.view] course = ${course}`)}
        <CourseStyled>
        </CourseStyled>
    </>
)

CourseView.propTypes = {
    course: PropTypes.string
}
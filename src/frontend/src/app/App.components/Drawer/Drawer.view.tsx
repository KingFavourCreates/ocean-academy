// import { courseData } from 'pages/Course/Course.data'
import { PublicUser } from 'shared/user/PublicUser'

import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { DrawerItem, DrawerMask, DrawerStyled, DrawerStyledLogin } from './Drawer.style'
import { Select } from '../Select/Select.controller'

// PLACEHOLDER.
// Use Select menu to choose the  
import { chapterData } from '../../../pages/Courses/ocean101/Chapters/Chapters.data'

import { ChapterData } from '../../../pages/Course/Course.controller'
import { chaptersByCourse } from '../../../pages/Course/Course.data'

type ChapterDrawerViewProps = {
  showingChapters: boolean
  hideCallback: () => void
  pathname: string
  changeCourseCallback: (e: string) => void
  activeCourse: string
}

type LoginDrawerViewProps = {
  showingMenu: boolean
  user: PublicUser
  hideCallback: () => void
  removeAuthUserCallback: () => void
}

type LoggedInDrawerViewProps = {
  showingMenu: boolean
  user: PublicUser
  removeAuthUserCallback: () => void
}

type LoggedOutDrawerViewProps = {
  showingMenu: boolean
}

export const ChapterDrawerView = ({ showingChapters, hideCallback, pathname, activeCourse, changeCourseCallback }: ChapterDrawerViewProps) => (
  <>
    {console.log("ChapterDrawerView showing = ", showingChapters)}
    <DrawerMask className={`${showingChapters}`} onClick={() => hideCallback()} />
    <DrawerStyled className={`${showingChapters}`}>
      <h1>Chapters</h1>

      <Select
        options={["ocean101", "introToDataDefi"]}
        defaultOption={activeCourse}
        selectCallback={(e) => changeCourseCallback(e)}
      />

      {chaptersByCourse[activeCourse].map((chapter: ChapterData) => (
        <DrawerItem key={chapter.pathname} className={pathname === chapter.pathname ? 'current-path' : 'other-path'}>
          <Link to={chapter.pathname} onClick={() => hideCallback()}>
            {chapter.name}
          </Link>
        </DrawerItem>
      ))}
    </DrawerStyled>
  </>
)

export const LoginDrawerView = ({ showingMenu, user, hideCallback, removeAuthUserCallback }: LoginDrawerViewProps) => (
  <>
    {console.log('LoginDrawerView showing = ', showingMenu)}
    <DrawerMask className={`${showingMenu}`} onClick={() => hideCallback()} />
    {user ?
      loggedInDrawer({ showingMenu, user, removeAuthUserCallback }) :
      loggedOutDrawer({ showingMenu })}
  </>
)

function loggedInDrawer({ showingMenu, user, removeAuthUserCallback }: LoggedInDrawerViewProps) {
  console.log("loggedInDrawer showing = ", showingMenu)
  return (
    <DrawerStyledLogin className={`${showingMenu}`}>
      <h1>Menu</h1>
      <DrawerItem>
        <Link to="/about">ABOUT US</Link>
      </DrawerItem>

      <DrawerItem>
        <Link to="/terms">TERMS</Link>
      </DrawerItem>

      <DrawerItem>
        <Link to={`/user/${user?.username}`}>{user?.username}</Link>
      </DrawerItem>

      <DrawerItem>
        <Link
          to="/"
          onClick={() => {
            removeAuthUserCallback()
          }}
        >
          LOGOUT
        </Link>
      </DrawerItem>
    </DrawerStyledLogin>
  )
}

function loggedOutDrawer({ showingMenu }: LoggedOutDrawerViewProps) {
  console.log("loggedOutDrawer showing = ", showingMenu)
  return (
    <DrawerStyledLogin className={`${showingMenu}`}>
      <h1>Menu</h1>
      <DrawerItem>
        <Link to="/about">ABOUT US</Link>
      </DrawerItem>

      <DrawerItem>
        <Link to="/terms">TERMS</Link>
      </DrawerItem>

      <DrawerItem>
        <Link to="/sign-up">SIGN UP</Link>
      </DrawerItem>

      <DrawerItem>
        <Link to="/login">LOGIN</Link>
      </DrawerItem>
    </DrawerStyledLogin>
  )
}

ChapterDrawerView.propTypes = {
  showingChapter: PropTypes.bool,
  hideCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  changeCourseCallback: PropTypes.func.isRequired,
  activeCourse: PropTypes.string.isRequired
}

ChapterDrawerView.defaultProps = {
  showingChapter: false,
}

LoginDrawerView.propTypes = {
  showingMenu: PropTypes.bool,
  user: PropTypes.object,
  hideCallback: PropTypes.func.isRequired,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

LoginDrawerView.defaultProps = {
  showingMenu: false,
  user: undefined,
}

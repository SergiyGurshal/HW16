import React from 'react'

import './App.css'
import incognitoAvatar from './img/incognito.svg'
import femaleIcon from './img/female.svg'
import maleIcon from './img/male.svg'
import notselected from './img/notselected.svg'

function importAvatars(r) {
  let images = {}
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item)
  })
  return images
}

function generateRandomNumber(parity) {
  parity = parity === 'odd' ? 1 : 0

  let number = Math.floor(Math.random() * (51 - 1) + 1)
  let isOdd = number & 1
  if (parity !== isOdd) {
    number === 50 ? (number -= 1) : (number += 1)
  }

  return number
}

function selectAvatar(gender) {
  const avatars = importAvatars(require.context('./img/avatars', false, /.svg/))
  let image

  if (gender === 'male') {
    let numberOfAvatar = generateRandomNumber('odd')
    numberOfAvatar = numberOfAvatar < 10 ? '0' + numberOfAvatar : numberOfAvatar
    image = avatars[`0${numberOfAvatar}-man.svg`].default
  } else if (gender === 'female') {
    let numberOfAvatar = generateRandomNumber('even')
    numberOfAvatar = numberOfAvatar < 10 ? '0' + numberOfAvatar : numberOfAvatar
    image = avatars[`0${numberOfAvatar}-woman.svg`].default
  } else {
    image = incognitoAvatar
  }
  return image
}

const Contact = ({ firstName, lastName, phone, gender }) => {
  let icon = notselected

  if (gender === 'male') {
    icon = maleIcon
  } else if (gender === 'female') {
    icon = femaleIcon
  }

  return (
    <div className="contact">
      <div>
        <img src={selectAvatar(gender)} alt="Avatar" className="avatar" />
      </div>
      <div className="contactInfo">
        <h3 className="nameSurname">{firstName + ' ' + lastName}</h3>
        <h5 className="phoneNumber">{phone}</h5>
      </div>
      <div>
        <img src={icon} alt="Gender icon" className="genderIcon" />
      </div>
    </div>
  )
}

export default Contact

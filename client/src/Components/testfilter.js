import React, { Component } from 'react'

class Filter extends Component {
  findInObject (my_object, my_criteria) {
    return my_object.filter(function (obj) {
      return Object.keys(my_criteria).every(function (c) {
        return obj[c] === my_criteria[c]
      })
    })
  }
  filter () {
    var myData = [{ 'name': 'Lenovo Thinkpad 41A4298', 'website': 'google' },
      { 'name': 'Lenovo Thinkpad 41A2222', 'website': 'google' },
      { 'name': 'Lenovo Thinkpad 41Awww33', 'website': 'yahoo' },
      { 'name': 'Lenovo Thinkpad 41A424448', 'website': 'google' },
      { 'name': 'Lenovo Thinkpad 41A429rr8', 'website': 'ebay' },
      { 'name': 'Lenovo Thinkpad 41A429ff8', 'website': 'ebay' },
      { 'name': 'Lenovo Thinkpad 41A429ss8', 'website': 'rediff' },
      { 'name': 'Lenovo Thinkpad 41A429sg8', 'website': 'yahoo' }]
    var myJson = JSON.stringify(myData)
    var filteredJson = this.findInObject(JSON.parse(myJson), { website: 'yahoo' })
    console.log(filteredJson)
    return filteredJson
  }

  render () {
    return (
      <div>
        {this.filter()}
      </div>
    )
  }
}

export default Filter

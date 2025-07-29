import React from 'react'
import TopRestaurantCard from './TopRestaurantCard'

const TopRestaurants = ({restaurant}) => {
  return (
    <div>
      <TopRestaurantCard restaurant = {restaurant}/>
    </div>
  )
}

export default TopRestaurants

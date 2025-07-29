import React from 'react'

const CityCard = () => {
    const cities = [{
           
    }]
  return (
    <div>
      <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Cities We Serve</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10">
        {cities.map((city, idx) => (
          <div key={idx} className="text-center shadow-md rounded-lg overflow-hidden">
            <img src={city.imageUrl} alt={city.name} className="h-40 w-full object-cover" />
            <p className="py-2 text-lg font-medium">{city.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CityCard
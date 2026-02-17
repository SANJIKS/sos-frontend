'use client'
import React from 'react'
import KyrgyzstanMap from '@/shared/ui/KyrgyzstanMap'

const MapTestPage = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#2C3E50' }}>
        Тест компонента KyrgyzstanMap
      </h1>
      
      <KyrgyzstanMap 
        title="География нашей деятельности"
        subtitle="Мы работаем во всех регионах Кыргызстана, помогая детям и семьям"

      />
    </div>
  )
}

export default MapTestPage

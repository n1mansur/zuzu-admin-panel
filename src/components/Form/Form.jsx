import React from 'react'
import BranchForm from '../BranchForm/BranchForm'
import ProductForm from '../ProductForm/ProductForm'
import { useParams } from 'react-router-dom'

export default function Form() {
  const { slug } = useParams()
  const forms = {
    branches: <BranchForm />,
    products: <ProductForm />,
  }

  return forms[slug]
}

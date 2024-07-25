import React from 'react'
import Layout from '@/components/layout/Layout'
import CreateFormBarn from '@/components/templates/BarnsPage/CreateFormBarn'

const AddFormPage = () => {
  console.log()

  return (
    <Layout title={'Anbarı yaradın'}>
      <CreateFormBarn />
    </Layout>
  )
}

export default AddFormPage
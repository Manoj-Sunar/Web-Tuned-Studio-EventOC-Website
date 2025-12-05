import React from 'react'
import DashboardPage from './routes/admin/page'
import AdminLayout from './routes/admin/layout'

const Home = () => {
    return (
       <AdminLayout>
        { <DashboardPage />}
       </AdminLayout>
    )
}

export default Home

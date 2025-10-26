import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import Layout from './Layout';
import Navbar from '../Components/Navbar';
import { useTranslation } from '../Context/TranslationContext.';
import MainDashboardComponent from '../DashboardComponents/mainDashboardComponent';

// ProposalCard Component


// Dashboard Page
export default function Dashboard() {


  return (
    <Layout>
      <MainDashboardComponent></MainDashboardComponent>
    </Layout>
  );
}




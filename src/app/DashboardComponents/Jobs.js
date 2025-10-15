'use client';
import { Filter } from 'lucide-react';
import Layout from '../Dashboard/Layout';
import SearchBar from './SearchBar';
import JobCard from './JobCard';
import { useTranslation } from '../Context/TranslationContext.';
import { InstantSearch } from 'react-instantsearch';
import CustomSearchBar2 from '../Components/CustomSearchBarJobs';
import ConditionalHits from '../Components/JobsConditionHits';
import { algoliasearch } from 'algoliasearch';
import { useState } from 'react';

 export default function Jobs() {
        const { translate, setLanguage, language } = useTranslation();
          const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');
          const [filters, setFilters] = useState({
              region: '',
              contractType: '',
              minimumSalary: '',
              specialization: ''
            });
        
  const jobs = [
    {
      title: translate('Barber In Paris'),
      company: 'Shiekh Solutions',
      location: 'Paris, France',
      experience: '3 Years',
      salary: '4000$',
      type: 'Part Time',
      skills: ['Unisex', 'Female Only', 'Male Only'],
      publishedDate: '2/2/25',
    },
    {
      title: translate('Barber In Paris') ,
      company: 'Shiekh Solutions',
      location: 'Paris, France',
      experience: '3 Years',
      salary: '4000$',
      type: 'Part Time',
      skills: ['Unisex', 'Female Only', 'Male Only'],
      publishedDate: '2/2/25',
    },
    {
      title: translate('Barber In Paris'),
      company: 'Shiekh Solutions',
      location: 'Paris, France',
      experience: '3 Years',
      salary: '4000$',
      type: 'Part Time',
      skills: ['Unisex', 'Female Only', 'Male Only'],
      publishedDate: '2/2/25',
    },
  ];

  return ( 
    
      <div className="p-6">
        <div className='w-full pb-8'>
            <InstantSearch indexName='Jobs' searchClient={searchClient}>
              <CustomSearchBar2 filters={filters} setFilters={setFilters}  ></CustomSearchBar2>
             <ConditionalHits></ConditionalHits>
              </InstantSearch>
        </div>
        {/* <div className="mb-6">
          <h1 className="text-2xl text-black font-bold mb-4">{translate('find_&_search_jobs')}</h1>
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Search Jobs By Location,Skill,jobtitle" />
            </div>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter size={18} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div> */}

        <div className="bg-white rounded-lg shadow">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    
  );
}
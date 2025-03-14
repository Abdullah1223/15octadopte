import { useTranslation } from "../Context/TranslationContext.";
import JobCard from "./JobCard";

export default function Favorites() {
        const { translate, setLanguage, language } = useTranslation();
    const favoriteJobs = [
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
  
    const recommendedJobs = [
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
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{translate('Favorite Jobs')}</h2>
                <p className="text-gray-500">{translate('All Your Favorites Jobs At One Place')}</p>
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">6</span> {translate('Favorite Jobs')}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow">
              {favoriteJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <nav className="flex">
                <a href="#" className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100">&lt;</a>
                <a href="#" className="px-3 py-1 border-t border-b border-gray-300 bg-gray-100">2</a>
                <a href="#" className="px-3 py-1 border-t border-b border-gray-300 hover:bg-gray-100">3</a>
                <a href="#" className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100">&gt;</a>
              </nav>
            </div>
          </div>
  
          <div>
            <h2 className="text-2xl font-bold mb-4">{translate('Jobs That You May Like')}</h2>
            <p className="text-gray-500 mb-4">{translate('Personalized Jobs For You')}</p>
            <div className="bg-white rounded-lg shadow">
              {recommendedJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </div>

    );
  }
  
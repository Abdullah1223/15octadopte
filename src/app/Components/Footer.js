import { FileText } from "lucide-react";
import { useTranslation } from "../Context/TranslationContext.";

const Footer = ()=>{
    const { translate, setLanguage, language } = useTranslation();


    return(
         <footer className="bg-[#3D3D3D] mt-12">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                  <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-orange-600" />
                        <span className="ml-2 text-xl font-bold text-white">Adopte Un Coiffeur</span>
                      </div>
                      <p className="mt-2 text-sm text-white">
                        {translate('footer_subheading')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{translate('easy_access')}</h3>
                        <ul className="mt-4 space-y-4">
                          <li><a href="/" className="text-base text-white ">{translate('home')}</a></li>
                          <li><a href="/Jobs" className="text-base text-white ">{translate('job_offers')}</a></li>
                          <li><a href="/Cv" className="text-base text-white ">{translate('cv_library')}</a></li>
                          <li><a href="/aboutus" className="text-base text-white ">{translate('about_us')}</a></li> 
                          <li><a href="/Contact-us" className="text-base text-white ">Contact & Support</a></li> 
                                                   
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{translate("for_employers")}</h3>
                        <ul className="mt-4 space-y-4">
                          <li><a href="/Cv" className="text-base text-white ">{translate('search_cv')}</a></li>
                          <li><a href="#" className="text-base text-white ">{translate('job_offer_creation')}</a></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{translate('for_candidates')}</h3>
                        <ul className="mt-4 space-y-4">
                          <li><a href="#" className="text-base text-white">{translate('upload_cv')}</a></li>
                          <li><a href="#" className="text-base text-white ">{translate('build_cv')}</a></li>
                          <li><a href="#" className="text-base text-white">{translate('find_jobs')}</a></li>
                        </ul>
                      </div>
                     
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                      {/* Social links */}
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                      &copy; {translate('rights_reserved')}
                    </p>
                  </div>
                </div>
              </footer>
    )

}

export default Footer;


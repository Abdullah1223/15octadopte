import { Badge, Calendar, Clock, CreditCard, DollarSign, Edit, Eye, Link, MapPin, Monitor, Pause, Play, RefreshCw, Target, Trash2, TrendingUp } from "lucide-react";

const BannerAdsComponent = ({ad})=>{


 return <div key={ad.id} className="group bg-white border-2 border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
  {/* Header */}
  <div className="flex justify-between items-start mb-6">
    <div className="flex items-center gap-3">
      <div className={`h-3 w-3 rounded-full ${
        ad.Status === 'active' 
          ? 'bg-emerald-500' 
          : ad.Status === 'pending' && !ad.isPaid 
            ? 'bg-orange-500' 
            : ad.isPaused 
              ? 'bg-yellow-500' 
              : 'bg-slate-400'
      }`}></div>
      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
        ad.Status === 'active' 
          ? 'text-emerald-700 bg-emerald-50' 
          : ad.Status === 'pending' && !ad.isPaid 
            ? 'text-orange-700 bg-orange-50' 
            : ad.isPaused 
              ? 'text-yellow-700 bg-yellow-50' 
              : 'text-slate-700 bg-slate-50'
      }`}>
        {ad?.Status === 'active' 
          ? 'Active Campaign' 
          : ad?.Status === 'pending' && !ad.isPaid 
            ? 'Waiting For Payment' 
            : ad.isPaused 
              ? 'Paused Campaign' 
              : ad.Status.charAt(0).toUpperCase() + ad.Status.slice(1) + ' Campaign'}
      </span>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => toggleAdStatus(ad.id, 'banner', setBannerAds)}
        className={`p-2 rounded-lg transition-all duration-200 ${
          ad.isPaused
            ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50' 
            : 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'
        }`}
      >
        {ad.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
      </button>
      <button
        onClick={() => deleteAd(ad.id, 'banner', setBannerAds, null)}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>

  {/* Banner Preview */}
  <div 
    className="w-full h-28 rounded-xl flex items-center justify-center text-white p-4 mb-6 shadow-lg relative overflow-hidden"
    style={{
      backgroundColor: ad.backgroundImage ? 'transparent' : ad.backgroundColor,
      backgroundImage: ad.backgroundImage ? `url(${ad.backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    
    {ad.backgroundImage && (
      <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
    )}
    <div className="text-center relative z-10">
      <h4 className="font-bold text-lg mb-1 drop-shadow-sm">{ad.Title}</h4>
      <p className="text-xs opacity-90 leading-relaxed drop-shadow-sm line-clamp-2">{ad.Description}</p>
    </div>
  </div>

  {/* Details */}
  <div className="space-y-4 mb-6">
    <div className="flex items-start gap-3">
      <Target className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
      <div className="flex flex-wrap gap-2">
        {ad?.targetSpecialization?.map((specialization) => (
          <span key={specialization} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-200">
            {specialization}
          </span>
        ))}
      </div>
    </div>
    
    <div className="flex items-start gap-3">
      <MapPin className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
      <div className="flex flex-wrap gap-2">
        {ad?.targetRegion?.map((region) => (
          <span key={region} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-slate-200">
            {region}
          </span>
        ))}
      </div>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <Monitor className="w-4 h-4 text-slate-500" />
      <span className="font-medium">{ad.adPlacement}</span>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <Badge className="w-4 h-4 text-slate-500" />
      <span className="font-medium capitalize">{ad.adType}</span>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <DollarSign className="w-4 h-4 text-slate-500" />
      <span className="font-medium">${ad.Budget.toLocaleString()}</span>
      <span className="text-slate-500 text-sm">({ad.durationType})</span>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <Calendar className="w-4 h-4 text-slate-500" />
      <span className="font-medium">
        {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
      </span>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <Clock className="w-4 h-4 text-slate-500" />
      <span className="font-medium">{ad.Duration}</span>
    </div>
    
    <div className="flex items-center gap-3 text-slate-700">
      <Link className="w-4 h-4 text-slate-500" />
      <a 
        href={ad.targetUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 truncate"
      >
        {ad.targetUrl}
      </a>
    </div>
  </div>

  {/* Performance Metrics */}
  <div className="bg-slate-50 rounded-xl p-4 space-y-3">
    <div className="flex items-center gap-2 mb-3">
      <TrendingUp className="w-4 h-4 text-slate-600" />
      <span className="text-sm font-bold text-slate-900">Performance Metrics</span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center">
        <div className="text-xl font-bold text-slate-900">{ad?.Impressions?.toLocaleString()}</div>
        <div className="text-xs text-slate-600 font-medium">Views</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-slate-900">{ad?.Clicks?.toLocaleString()}</div>
        <div className="text-xs text-slate-600 font-medium">Clicks</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-emerald-600">{ad?.Ctr}%</div>
        <div className="text-xs text-slate-600 font-medium">CTR</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-purple-600">${ad?.totalSpent?.toLocaleString()}</div>
        <div className="text-xs text-slate-600 font-medium">Total Spent</div>
      </div>
    </div>
    
    <div className="pt-3 border-t border-slate-200">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Created: {new Date(ad?.createdAt)?.toLocaleDateString()}
        </div>
        <div className="text-right">
          <div className="font-medium text-slate-700">
            {Math.ceil((new Date(ad?.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-3 mt-6">
    <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
      <Edit className="w-4 h-4" />
      Edit
    </button>
    
    {/* Conditional Pay/Renew Button */}
    {(!ad.isPaid && !ad.isApproved && !ad.isExpired) ? (
      <button 
        onClick={() => handlePayment(ad.id)}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        Pay
      </button>
    ) : (ad.isPaid && ad.isApproved && ad.isExpired) ? (
      <button 
        onClick={() => handleRenewal(ad.id)}
        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Renew
      </button>
    ) : (
      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
        <Eye className="w-4 h-4" />
        View Details
      </button>
    )}
  </div>
</div>
}

export default BannerAdsComponent;
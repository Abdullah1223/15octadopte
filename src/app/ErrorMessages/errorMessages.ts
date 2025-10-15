import { title } from "process"

export  const JobAdError = {
           title:"Erreur lors de la récupération des annonces d’emploi",
           description:"Veuillez réessayer plus tard."
    
}

export const JobFetchErrorServer = {
    title:"Les offres d’emploi ne peuvent pas être récupérées.",
    description:"Le serveur est occupé, veuillez réessayer plus tard."
}

export const signOutServerError= {
    title:"Cannot Sign Out",
    description:"Server Error Occurred Cannot Logout"
}
export const signOutBadRequestError= {
    title:"Cannot Sign Out",
    description:"Bad Request Error Occurred Cannot Logout"
}

export const signedOutError= {
    title:"Signed Out",
    description:"You Are Not Logged In!"
}

export const proposalServerErrorMessage = {
    title:"Cannot Fetch Proposal",
    description:"Server Error Occurred Cannot Fetch Proposal"
}

export const NotLoggedInErrorMessage = {
     title: "Non connecté",
  description: "Vous n'êtes pas connecté"
}

export const proposalNotFoundErrorMessage = {
    title: "Proposition introuvable",
    description: "Malheureusement, la proposition est introuvable"
}

export const CvNotFoundErrorMessage = {
    title:"Cv introuvable",
    description:"Malheureusement, le CV est introuvable"
}

export const CvServerErrorMessage = {
    title:"Cv introuvable",
    description:"Le serveur est occupé, veuillez réessayer plus tard."
}

export const CvUnAuthorizedErrorMessage = {
    title:"Authentification requise",
    description:"Veuillez vous connecter pour voir le CV."
}

export const LikedServerErrorMessage = {
    title:"Liked Failed",
    description:"Server Error Occurred Please Try Again"
}

export const SavedJobServerErrorMessage =  {
    title:"Saved Job Failed",
    description:"Server Error Occurred Please Try Again"
}

export const MainFetchCv404ServerErrorMessage = {
        title:"CV introuvable",
        description:"Le serveur est occupé, veuillez réessayer plus tard."
}

export const messageSentError = {
    title:"Message Sent Error",
    description:"Message Could Not Be Sent"
}

export const notificationServerError = {
    title: "Erreur du serveur",
    description: "Une erreur s'est produite lors du traitement de votre demande."
}
export const notificationNotFoundError = {
    title: "Introuvable",
    description: "La ressource demandée est introuvable."
}
export const notificationBadRequestError = {
    title: "Requête invalide",
    description: "La demande envoyée est incorrecte ou incomplète."
}
export const notificationInternalServerError = {
    title: "Erreur interne du serveur",
    description: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard."
}
export const errorFetchingAds = {
    title:"Error Fetching Ads",
    description:"Server Error Occurred Please Try Again"
}
export const badRequestErrorProfileInfo = {
    title: "Erreur de requête incorrecte",
    description: "Une erreur de requête incorrecte s'est produite. Impossible de récupérer les informations du profil."
}
export const notFoundErrorProfileInfo = {
    title: "Profil introuvable",
    description: "Le profil utilisateur que vous recherchez n'existe pas ou n'est plus disponible."
}
export const serverErrorOccurredProfileInfo = {
    title: "Erreur du serveur",
    description: "Une erreur du serveur s'est produite. Veuillez réessayer plus tard."
}

export const errorFetchingJobs = {
    title: "Erreur lors du chargement des offres",
    description: "Impossible de récupérer les offres pour le moment. Veuillez réessayer plus tard."
}

export const creatorJobsNotFound = {
    title: "Aucune offre trouvée",
    description: "Aucune offre n’a été trouvée pour ce créateur."
}

export const serverErrorOccurredCreatorJobs = {
    title: "Erreur du serveur",
    description: "Une erreur s'est produite lors du chargement des offres du créateur. Veuillez réessayer plus tard."
}

export const errorUploadingProfilePicture = {
    title: "Erreur lors du téléversement de la photo de profil",
    description: "Une erreur s'est produite pendant le téléversement de votre photo de profil."
}
export const errorUpdatingProfile = {
    title: "Erreur de mise à jour",
    description: "Une erreur s'est produite lors de la mise à jour du profil"
}

export const errorSavingUser = {
    title: "Erreur lors de l'enregistrement de l'utilisateur",
    description: "Une erreur est survenue pendant la sauvegarde de l'utilisateur."
}

export const errorUnsavingUser = {
    title: "Erreur lors de la suppression de l'enregistrement de l'utilisateur",
    description: "Une erreur est survenue pendant la suppression de la sauvegarde de l'utilisateur."
}

export const errorFetchingDashboardStats = {
  title: "Erreur lors de la récupération du tableau de bord",
  description: "Une erreur s'est produite lors du chargement des statistiques du tableau de bord."
}

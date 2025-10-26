import { exportTraceState } from "next/dist/trace"
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

export const errorFetchingJob404 = {
  title: "Erreur lors de la récupération de l'emploi",
  description: "L'emploi demandé est introuvable ou a été supprimé."
};
export const serverErrorChaningEmail = {
  title: "Erreur du serveur",
  description: "Une erreur s'est produite lors du changement de l'adresse e-mail."
}

export const OTPAlreadySentChangeEmail = {
  title: "Code déjà envoyé",
  description: "Un code de vérification a déjà été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception."
}
export const invalidEmail = {
  title: "E-mail invalide",
  description: "Veuillez entrer une adresse e-mail valide."
}

export const emailAlreadyChangedError = {
    title: "E-mail déjà modifié",
    description: "Votre adresse e-mail a déjà été changée récemment.",
}

export const emailAlreadyExists = {
    title: "E-mail déjà existant",
    description: "Cette adresse e-mail est déjà utilisée par un autre compte.",
}
export const serverErrorFetchingSecuritySettings = {
    title: "Erreur du serveur",
    description: "Une erreur est survenue lors de la récupération des paramètres de sécurité.",
}

export const userNotFound = {
    title: "Utilisateur introuvable",
    description: "L’utilisateur demandé n’a pas été trouvé.",
}

export const badRequestFetchingSecuritySettings = {
    title: "Requête invalide",
    description: "La demande de récupération des paramètres de sécurité est invalide.",
}

export const OtpAlreadySentDisableTwoFactor = {
    title: "OTP déjà envoyé",
    description: "Un code de vérification a déjà été envoyé. Veuillez attendre avant de désactiver l’authentification à deux facteurs."
}

export const AlreadyDisabledTwoFactor = {
    title: "Authentification à deux facteurs déjà désactivée",
    description: "L’authentification à deux facteurs est déjà désactivée pour ce compte."
}

export const AlreadyEnabledTwoFactor = {
    title: "Authentification à deux facteurs déjà activée",
    description: "L’authentification à deux facteurs est déjà activée pour ce compte."
}
export const serverErrorWhileTwoFactor = {
    title: "Erreur du serveur",
    description: "Une erreur s’est produite lors du traitement de l’authentification à deux facteurs. Veuillez rées"
}
export const invalidOtp = {
    title: "Code OTP invalide",
    description: "Le code de vérification que vous avez saisi est incorrect ou a expiré."
}
export const invalidCode = {
    title: "Code invalide",
    description: "Le code que vous avez entré est incorrect ou expiré."
}

export const errorOccurredVerifyingPassword = {
  title: "Erreur",
  description: "Une erreur est survenue lors de la vérification du mot de passe.",
}
export const notVerified = {
  title: "Non vérifié",
  description: "Votre compte n’a pas encore été vérifié.",
}
export const passwordDontMatch = {
  title: "Les mots de passe ne correspondent pas",
  description: "Veuillez vous assurer que les deux mots de passe sont identiques.",
}

export const oldPasswordMatchEnterNew = {
    title: "Ancien mot de passe identique",
    description: "Veuillez saisir un nouveau mot de passe différent de l'ancien."
}

export const serverErrorWhileChangingPassword = {
    title: "Erreur du serveur",
    description: "Une erreur du serveur est survenue lors du changement de mot de passe."
}

export const errorSendingMessage = {
    title: "Erreur lors de l’envoi du message",
    description: "Une erreur est survenue pendant l’envoi de votre message. Veuillez réessayer."
}

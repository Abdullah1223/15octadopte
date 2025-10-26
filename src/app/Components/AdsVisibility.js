import AdsPreview from "./AdsPreview";

const AdsVisibility = ({visibility,adsContent})=>{
    console.log(adsContent)
    if(!adsContent){
        return null;
    }
    return (
        <div className={visibility}>
            <AdsPreview data={adsContent} ></AdsPreview>
        </div>
    )

}

export default AdsVisibility;
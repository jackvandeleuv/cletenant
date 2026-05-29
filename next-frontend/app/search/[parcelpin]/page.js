import { getParcel } from "../../utils/fetchData";
import ParcelPage from "./ParcelPage";

export default async function ParcelPageWrapper({ params }) {   
    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    return (
        <ParcelPage parcel={parcel}/>
    )
}

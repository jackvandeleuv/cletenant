import OwnerBanner from "@/app/components/OwnerBanner/OwnerBanner";
import OwnerCard from "@/app/components/OwnerCard/OwnerCard";
import ParcelCarosel from "@/app/components/ParcelCarosel/ParcelCarosel";
import { getOwner } from "@/app/utils/fetchData";

export async function generateMetadata({ params }) {
    const { ownerid } = await params;
    const owner = (await getOwner(ownerid))[0];

    const parcels = owner.parcels_owned === 1 ? 'property': 'properties';

    return {
        title: `Overview | ${owner.std_deeded_owner}`,
        description: `Summary of the ${owner.parcels_owned} ${parcels} owned by ${owner.std_deeded_owner}.`,
        alternates: {
            canonical: `owner/${ownerid}`,
        },
    }
}

export default async function OwnerPage({ params }) {
    const { ownerid } = await params;
    const owner = (await getOwner(ownerid))[0];

    return (
        <div className={'contentWrapper'}>
            <OwnerBanner owner={owner} />
            <OwnerCard owner={owner} owner_id={ownerid} includeSubtitle={false} />
            <ParcelCarosel parcels={owner.parcels} />
        </div>
    );
}
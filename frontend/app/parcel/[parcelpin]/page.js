import { getParcel } from "../../utils/fetchData";
import { convertDateObjectToLabel, parcelObjToTaxDelinquencyLabel, sleep } from "../../utils/utilities.js";
import ParcelInfoHeader from "./ParcelInfoHeader.js";
import AddressBanner from "../../components/AddressBanner/AddressBanner";
import RentalCard from "../../components/RentalCard/RentalCard";
import InfractionCard from "../../components/InfractionCard/InfractionCard";

import { parcelObjToAddressLabel } from '../../utils/utilities';
import SurveyCard from "../../components/SurveyCard/SurveyCard";
import OwnerCard from "../../components/OwnerCard/OwnerCard";
import FooterSpacer from "@/app/components/FooterSpacer/FooterSpacer";

export async function generateMetadata({ params }) {
    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    const shortAddress = parcelObjToAddressLabel(parcel);

    return {
        title: `Overview | ${shortAddress}`,
        description: `Overview of public data on ${shortAddress}.`,
        alternates: {
            canonical: `parcel/${parcelpin}`,
        },
    }
}

export default async function ParcelPage({ params }) {
    // await sleep(100000);

    const { parcelpin } = await params;
    const parcel = (await getParcel(parcelpin))[0];

    // logPageVisited(parcelpin, 'overview');
    
    const enforcement = [
        [
            'Code Violations', 
            parcel.code_violations, 
            'violations',
            'Official notices of building or zoning code violations.'
        ],
        [
            'Civil Tickets', 
            parcel.civil_tickets, 
            'civil-tickets',
            'Fines issued by the City.',
        ],
    ];

    const complaints = [
        [
            '311 Complaints', 
            parcel.complaints_311, 
            'complaints-311',
            'Complaints received through the 311 website or phone line.'
        ],
        [
            'Health Complaints', 
            parcel.complaints_health, 
            'complaints-health',
            'Complaints received by the City Department of Public Health.'
        ],
    ];

    const codeInfractionBody = `The City of Cleveland issues violations and civil tickets when properties fail to comply with building or zoning code rules. Both indicate problems and may result in penalties`;
    const complaintBody = <>Complaints can be made through the <a style={{textDecoration: 'underline'}} target="_blank" href="https://www.clevelandohio.gov/311/building-housing">311 website</a> and phone line, and through the <a style={{textDecoration: 'underline'}} target="_blank" href="https://www.clevelandohio.gov/city-hall/departments/public-health/submit-complaint">Department of Public Health</a>.</>;

    return (
        <div className={'contentWrapperOuter'}>
            <div className={'contentWrapper'}>
                <AddressBanner parcel={parcel} />

                <ParcelInfoHeader parcel={parcel} />

                <RentalCard parcel={parcel} />

                <InfractionCard 
                    parcelpin={parcel.parcel}
                    title={'Infractions'}
                    body={codeInfractionBody}
                    cardSpecs={enforcement}
                />

                <InfractionCard 
                    parcelpin={parcel.parcel}
                    title={'Complaints'}
                    body={complaintBody}
                    cardSpecs={complaints}
                />

                <SurveyCard parcel={parcel} />

                <OwnerCard owner={parcel.owners} owner_id={parcel.owner_id} includeSubtitle={true} />

                <FooterSpacer />
            </div>
        </div>
    )
}

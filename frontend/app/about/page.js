import FooterSpacer from "../components/FooterSpacer/FooterSpacer";
import SiteHeader from "../components/SiteHeader/page";
import styles from './About.module.css';

export const metadata = {
    title: {
        default: 'CleTenant | About',
    },
    description: 'CleTenant is free tool for viewing public data on Cleveland properties. While it is intended primarily for use by renters, data from non-rental properties is also included.',
    alternates: {
        canonical: '/about',
    },
}

function SourceCard({ spec }) {
    return (
        <a
            className={styles.sourceCard}
            href={spec.href}
            target={'_blank'}
        >
            <div>
                {spec.icon}
            </div>
            <div>
                <h2>{spec.title}</h2>
                <p>
                    {spec.body}
                </p>
            </div>
        </a>
    )
}

export default function About() {
    const links = [
        {
            title: 'Property Insights Dataset',
            body: '"Cross-source analytics on property data from the County."',
            icon: (
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M272-120 64-480l208-360h416l208 360-208 360H272Zm46-80h324l161-280-161-280H318L156-480l162 280Zm162-280Z"/>
                </svg>
            ),
            href: 'https://data.clevelandohio.gov/datasets/ClevelandGIS::property-insights-dataset/about',
        },
        {
            title: 'Civil Tickets',
            body: '"Civil Tickets issued by the City of Cleveland Department of Building & Housing, reflecting civil enforcement actions for property maintenance and housing violations."',
            icon: (
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"/>
                </svg>
            ),
            href: 'https://data.clevelandohio.gov/datasets/ClevelandGIS::civil-tickets/about',
        },
        {
            title: 'Violation Status History',
            body: '"A history of statuses for every building code violation record in City Accela records. This dataset provides one with a snapshot of the lifecycle of a given violation over time."',
            icon: (
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m880-194-80-80v-326H474l-74-74v-86h-86l-80-80h246v160h400v486ZM820-28l-94-92H80v-648l-52-52 56-56L876-84l-56 56ZM160-200h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h166l-80-80h-86v80Zm240-240h-80v-80h80v80Z"/>
                </svg>
            ),
            href: 'https://data.clevelandohio.gov/datasets/ClevelandGIS::building-violation-status-history/about',
        },
        {
            title: '311 Service Requests',
            body: '"311 is a City of Cleveland program for reporting complaints and submitting service requests for non-emergency issues, such as potholes or problems with trash pickups."',
            icon: (
                <svg  className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            ),
            href: 'https://data.clevelandohio.gov/datasets/ClevelandGIS::311-service-requests/about',
        },
        {
            title: 'Public Health Complaints',
            body: '"Reported problems from the public about food safety, air issues, or residential nuisances."',
            icon: (
                <svg  className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M420-340h120v-100h100v-120H540v-100H420v100H320v120h100v100Zm60 260q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
                </svg>
            ),
            href: 'https://data.clevelandohio.gov/datasets/ClevelandGIS::public-health-complaints/about',
        },
    ];


    return (
        <>
            <SiteHeader />

            <div className={'contentWrapperOuter'}>
                <div className={'contentWrapper'}>
                    <div className={styles.headerBox}>
                        <h1 className={styles.header}>About</h1>
                    </div>
                    <section className={styles.section}>
                        <h1>Welcome to CleTenant!</h1>
                        <p>
                            CleTenant is free tool for viewing public data on Cleveland properties.
                            While it is intended primarily for use by renters, data from non-rental properties is also included.
                        </p>
                        <p>
                            <strong>
                                This is an independent project that is not affiliated with the City or County government in any way.
                            </strong>
                        </p>
                    </section>
                    <section className={styles.section}>
                        <h1>Why did you build this tool?</h1>
                        <p>
                            There is a lot of data being published by the City and County that sheds light on the quality of housing in Cleveland.
                            This includes complaints, code infractions, tax delinquency, and even survey-based assessments of housing quality.
                        </p>
                        <p> 
                            However, even when data is made public, it is not always being presented in an easy-to-use, searchable format. 
                            CleTenant is trying to bridge that gap by providing the simplest, most user-friendly presentation of the data possible.
                        </p>
                        <p>
                            If you have any feedback on this site, positive or negative, please consider filling out the survey below.
                        </p>
                        <div className={styles.surveyWrapper}>
                            <a
                                target={'_blank'}
                                href={'https://forms.gle/FR4zkbvJjbf4P1gu6'}
                                className={styles.surveyLink}
                            >
                                Survey
                            </a>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h1>Where does the data come from?</h1>
                        <p>
                            The data shown on this site comes from the City of Cleveland's Open Data Portal, which publishes a variety of datasets related to housing quality.
                        </p>
                        <p>
                            Some data on this portal is itself sourced from Cuyahoga County. To see more details, visit the <a style={{textDecoration: 'underline'}} href="https://data.clevelandohio.gov" target={'_blank'}>official site</a>.
                        </p>
                        <p>
                            All the numbers on CleTenant can be replicated using the following open data sources:
                        </p>
                        {links.map((spec) => (
                            <SourceCard key={spec.title} spec={spec} />
                        ))}
                    </section>

                    <FooterSpacer />
                </div>
            </div>
        </>
    )
}
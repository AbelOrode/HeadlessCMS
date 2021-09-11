import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import {API_URL} from "@/config/index";
import Link from 'next/link'

export default function HomePage({events}) { //place the events object in the frontend
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events === 0 && <h3>No events to show</h3>}
            {events.map((evt) =>(
                <EventItem key={evt.id} evt={evt}/>
            ))}
            {events.length > 0 && (
                <Link href='/events'>
                    <a className='btn-secondary'>View All Events</a>
                </Link>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`) //Get the event object from the serverside
    const events = await res.json();

    //The getStaticProps can
    return {
        props: {events},
        revalidate: 1,
    }
}

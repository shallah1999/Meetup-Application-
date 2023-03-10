import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import { Fragment} from "react";
import Head from "next/head";

function HomePage(props) {

    return (
        <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a Huge list of meetups our the world"/>
        </Head>
            <MeetupList meetups={props.meetups} />
            </Fragment>
    );
}


export async function getStaticProps(){

    const client = await MongoClient.connect('mongodb+srv://shallah:rPrFqknl8vOghdQ6@cluster0.xf9eaiw.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray()

        client.close()

    return{
        props:{
            meetups: meetups.map(meetup =>({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage;

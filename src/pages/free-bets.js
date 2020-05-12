import React, { useState } from 'react';
import Layout from '../components/layout';
import PageHeadline from '../components/pageHeadline';
import SectionTitle from '../components/SectionTitle';
import FreeBets from '../components/FreeBets/FreeBets'

const FreeBetsPage = () => {
    return (
        <Layout>
            <PageHeadline title="Free bets page" subtitle="A subtitle about this page, maybe it needs to be slightly longer" />
            <SectionTitle title="Free Bets" />
            <FreeBets/>
        </Layout>
    )
}

export default FreeBetsPage;
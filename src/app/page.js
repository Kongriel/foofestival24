"use client";

import React from "react";

import Hero from "./components/Hero";
import Herotekst from "./components/Herotekst";
import Knap1 from "./components/Knap1";
import Centertext from "./components/Centertext";
import Card from "./components/Card";

import Sponsor from "./components/Sponsor";

import Clubjoin from "./components/Clubjoin";
import Knap2 from "./components/Knap2";
import LiveNow from "./components/LiveNow";

export default function Home() {
  return (
    <main>
      <section className=" mt-36">
        <Herotekst />
        <Hero />
      </section>
      <div className="flex justify-center mt-16 mb-36">
        <Knap1 />
      </div>
      <section>
        <Centertext />
      </section>
      <section className="flex mb-12 flex-wrap justify-center items-center gap-8 w-fit p-12 mx-auto">
        <Card title="FOOFEST 24" status="REGULAR" subtitle="Billetten giver dig adgang til festivalpladsen og alle koncerterne på Foofest 2024." price="799,00" ticketType="regular" />
        <Card title="FOOFEST 24" status="VIP" subtitle="Billetten giver adgang til festivalpladsens VIP lounger og alle koncerterne på Foofest 2024." price="1299,00" ticketType="VIP" />
      </section>
      <section className="flex justify-center mt-6 mb-24">
        <Knap2 />
      </section>

      <section>
        <Clubjoin />
      </section>

      <section>
        <Sponsor />
      </section>
    </main>
  );
}

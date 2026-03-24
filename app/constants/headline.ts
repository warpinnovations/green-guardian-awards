export interface Headline {
  date: string;
  topic: string;
  headline: string;
  imageUrl: string;
  link?: string;
}

export const headlines: Headline[] = [
  {
    "date": "July 12, 2002",
    "topic": "The Killing of Espinosa",
    "headline": "Espinosa killed in Zamora Shooting: A member of Espinosa family was killed by a lone gunman remains at large.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2002.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwMi5qcGciLCJpYXQiOjE3NzQzNDA5NDYsImV4cCI6MTgwNTg3Njk0Nn0.CeGeLoSaZmVA-thWzX4UWyeF683T8zttMY4u87bajs8"
  },
  {
    "date": "March 6, 2003",
    "topic": "Bomb Explosion",
    "headline": "ALERT Iloilo braces vs terrorism: Iloilo’s officialdom tolled alarm bells all over the city and province to brace for the possible spread of terrorism into this part of country following the bombing outside Davao airport.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2003.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwMy5qcGciLCJpYXQiOjE3NzQzNDEwNDcsImV4cCI6MTgwNTg3NzA0N30.JakvVD7bQ1shBpKYfQgyPMByAJUfT6wsG4daODb-0kw"
  },
  {
    "date": "September 10, 2004",
    "topic": "RPA-ABB’s Leaders “Ka Mokong’s” Death",
    "headline": "NPA CLAIMS MOKONG’S SLAY, ANTIQUE AMBUSH: Communist rebels in Panay claimed responsibility for the killing of RPA-ABB leader Daniel “Ka Mokong” Batoy.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2004.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwNC5qcGciLCJpYXQiOjE3NzQzNDEwNjUsImV4cCI6MTgwNTg3NzA2NX0.MJH-83i-xY1B2To9_1TEAxm8A7ybgSslf9NSd0ys9CA"
  },
  {
    "date": "November 21, 2005",
    "topic": "NPA Landmines killed 9 Army soldiers",
    "headline": "AMBUSH 9 KILLED, 14 WOUNDED IN CALINOG: The Philippine Army denounced the NPA for using landmines.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2005.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwNS5qcGciLCJpYXQiOjE3NzQzNDEwNzYsImV4cCI6MTgwNTg3NzA3Nn0.V9sDVt1jvWFw_EXZ2Zu7nlgc5YFzazqNMqXy0LEt6zE"
  },
  {
    "date": "January 13, 2006",
    "topic": "Bobby Tan Murder Case",
    "headline": "‘TAN SONS DID IT’: CIDG files murder raps vs suspects tied to business motive.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2006.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwNi5qcGciLCJpYXQiOjE3NzQzNDEwOTgsImV4cCI6MTgwNTg3NzA5OH0.ZMutsFmg8V-g7_1nodnyahPXtHCjB8laL-bJLIUzatw"
  },
  {
    "date": "January 18, 2007",
    "topic": "Capitol Siege",
    "headline": "CA STOPS CAPITOL SIEGE: Armed policemen stormed the Capitol as a TRO allowed Gov. Tupas to stay.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2007.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwNy5qcGciLCJpYXQiOjE3NzQzNDExMTcsImV4cCI6MTgwNTg3NzExN30.hUsD_xM_rYvS-fb0sB70eAzotUp5cTZFP1IvFXq8VzU",
    "link": "https://www.facebook.com/share/p/18RepsrPii/"
  },
  {
    "date": "June 23-24, 2008",
    "topic": "Typhoon Frank",
    "headline": "“FRANK” DEATH TOLL IN WV REACHES 123.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2008.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwOC5qcGciLCJpYXQiOjE3NzQzNDExMzcsImV4cCI6MTgwNTg3NzEzN30.kU1xi986W5p9rH_0XTBXSI3G9Xk3A57Ze0ykABTvk6I"
  },
  {
    "date": "November 5, 2009",
    "topic": "Gonzales–Treñas Split",
    "headline": "JR. TO JERRY: ‘WHY CAN’T YOU WAIT?’",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2009.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAwOS5qcGciLCJpYXQiOjE3NzQzNDExNDcsImV4cCI6MTgwNTg3NzE0N30.fJORVrOTiCkZ6u1t6B8oMhGzM1mHcQ8fAumDAJ87CMA"
  },
  {
    "date": "May 15-16, 2010",
    "topic": "Elections",
    "headline": "TREÑAS–MABILOG ENDS REIGN OF RAUL GONZALEZ.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2010.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxMC5qcGciLCJpYXQiOjE3NzQzNDExNTYsImV4cCI6MTgwNTg3NzE1Nn0.gyNbVBxFpYmP1k3WwI7br9GmHcHEm7KyZ8H9sIKYvKE"
  },
  {
    "date": "April 2-3, 2011",
    "topic": "Coal Plant",
    "headline": "DAWN OF PANAY’S ECONOMIC POWER.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2011.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxMS5qcGciLCJpYXQiOjE3NzQzNDExNjYsImV4cCI6MTgwNTg3NzE2Nn0.sIVf-4q_J2u7SQuvBxofpWsA-lD79MM4y8KzOd9AOUQ"
  },
  {
    "date": "December 3, 2012",
    "topic": "Typhoon Pablo",
    "headline": "ILOILO GEARING FOR SUPER TYPHOON PABLO.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2012.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxMi5qcGciLCJpYXQiOjE3NzQzNDExNzYsImV4cCI6MTgwNTg3NzE3Nn0.VVqe06pmbXueRH8vmWYzRL7pu9fOu3EVzVuAU-oCjXI"
  },
  {
    "date": "November 11, 2013",
    "topic": "Typhoon Yolanda",
    "headline": "TRAIL OF DEATH & DESTRUCTION.",
    "imageUrl": "/dg-headlines/2013.jpg",
    "link": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2013.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxMy5qcGciLCJpYXQiOjE3NzQzNDExODgsImV4cCI6MTgwNTg3NzE4OH0.LBkjF5X14T6d1iHJCoMAQUvcSZGKf8mdGu0xE-35u1A"
  },
  {
    "date": "March 17, 2014",
    "topic": "Capalla Murder",
    "headline": "Who murdered Romy Capalla?",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2014.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxNC5qcGciLCJpYXQiOjE3NzQzNDExOTgsImV4cCI6MTgwNTg3NzE5OH0.lItNV0JaF3deN1TZuMdIwPaJe8jjcma_qxLrlDPLUIg"
  },
  {
    "date": "November 3, 2015",
    "topic": "Tanim Bala",
    "headline": "Iloilo airport safe vs ‘tanim-bala’ racket?",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2015.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxNS5qcGciLCJpYXQiOjE3NzQzNDEyMDgsImV4cCI6MTgwNTg3NzIwOH0.FyNYYW9YnMPGkGSZ-wRCwsAlwJKYUoxzyzZu9r93PRI"
  },
  {
    "date": "July 8, 2016",
    "topic": "War on Drugs",
    "headline": "941 ‘drug pushers, users’ surrender.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2016.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxNi5qcGciLCJpYXQiOjE3NzQzNDEyMTgsImV4cCI6MTgwNTg3NzIxOH0.bmngmJRwd0b9XYSswgErkjUd5uUaZoPPE9ToVhTvjtI"
  },
  {
    "date": "October 19, 2017",
    "topic": "Airsoft Gang",
    "headline": "‘Airsoft’ gang strikes in city.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2017.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxNy5qcGciLCJpYXQiOjE3NzQzNDEyMzEsImV4cCI6MTgwNTg3NzIzMX0.znoZtjXfRsxzBbf80j0j_7Px0ntLRzV9kBKYBoHqDz8"
  },
  {
    "date": "April 6, 2018",
    "topic": "Boracay Closure",
    "headline": "Aklan Mayor ready to face probe over Boracay issues.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2018.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxOC5qcGciLCJpYXQiOjE3NzQzNDEyNDEsImV4cCI6MTgwNTg3NzI0MX0.P4XxQqc54Prl02zU_DrEB4kjVlL-aFwLjy6bMatGx4I",
    "link": "https://www.facebook.com/share/p/18ZGTRswXX/"
  },
  {
    "date": "August 9, 2019",
    "topic": "Guimaras Tragedy",
    "headline": "OVERHAUL LOOMS after Iloilo Strait tragedy.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2019.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAxOS5qcGciLCJpYXQiOjE3NzQzNDEyNTQsImV4cCI6MTgwNTg3NzI1NH0.C-56q899tGQEbkWl5WCfdKEengl9sf_fVOiOPKLoLoo"
  },
  {
    "date": "July 20, 2020",
    "topic": "COVID-19",
    "headline": "More than 70% of rural health units infected with COVID-19.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2020.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyMC5qcGciLCJpYXQiOjE3NzQzNDEyNjksImV4cCI6MTgwNTg3NzI2OX0.m43ukPmXR4ihJCPl_UPwkkZjrb7B8fvHvogrHSR3S-8",
    "link": "https://www.facebook.com/share/p/1CMRiQQ4wj/"
  },
  {
    "date": "September 1, 2021",
    "topic": "COVID Vaccine",
    "headline": "5.6% of COVID cases were fully vaccinated.",
    "imageUrl": "/dg-headlines/2021.jpg",
    "link": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2021.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyMS5qcGciLCJpYXQiOjE3NzQzNDEyODIsImV4cCI6MTgwNTg3NzI4Mn0.arvq5lJwCWF3AAiRriXKAKYzekVcJbRzZuhZUENmsqQ"
  },
  {
    "date": "March 2, 2022",
    "topic": "Face-to-Face Classes",
    "headline": "Limited face-to-face classes start in Iloilo.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2022.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyMi5qcGciLCJpYXQiOjE3NzQzNDEyOTQsImV4cCI6MTgwNTg3NzI5NH0.vO_1Kxc0pBuem__9LpD2rpn-0NI_mNZM8-vddfMDGZE",
    "link": "https://www.facebook.com/share/p/17tzKw5WUi/"
  },
  {
    "date": "October 1, 2023",
    "topic": "Confidential Funds",
    "headline": "COA: Davao City tops confidential funds spending.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2023.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyMy5qcGciLCJpYXQiOjE3NzQzNDEzNDQsImV4cCI6MTgwNTg3NzM0NH0.2if0ej7Q6iUmCeaiSPW3RwepMhJmEzQ3agsngfwagKw",
    "link": "https://www.facebook.com/share/p/1H9f1p4pLw/"
  },
  {
    "date": "March 9, 2024",
    "topic": "WVSUCAT",
    "headline": "20,925 students to take WVSUCAT.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2024.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyNC5qcGciLCJpYXQiOjE3NzQzNDEzMjIsImV4cCI6MTgwNTg3NzMyMn0.MW68DDSI8uMsxBd8PJfGcK7F8UfmaQtHg-Ii0VgJr4s",
    "link": "https://www.facebook.com/share/p/14d7QKZaorK/"
  },
  {
    "date": "March 12, 2025",
    "topic": "Duterte Arrested",
    "headline": "‘HE HAD IT COMING’: Ex-Pres Duterte arrested for crimes against humanity.",
    "imageUrl": "https://dguqzwftkuulbfctxqrf.supabase.co/storage/v1/object/sign/dg-headlines/2025.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMTM0NWQyNy1hYzA5LTRjMzctYmYyZC0wNGUwMjYyNTI0Y2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkZy1oZWFkbGluZXMvMjAyNS5wbmciLCJpYXQiOjE3NzQzNDEzMzUsImV4cCI6MTgwNTg3NzMzNX0.s4L_f1Mo4tQK6K4mgEKF1x_gwS07-0aMxWJIDkrZY9Q",
    "link": "https://dailygcanauardian.com.ph/he-had-it-coming-ex-pres-duterte-arrested-for-crimes-against-humanity/"
  }
];
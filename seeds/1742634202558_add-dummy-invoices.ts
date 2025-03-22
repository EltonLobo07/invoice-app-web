import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";

type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type Item = {
  name: string;
  quantity: number;
  price: number;
};

const invoices: {
  status: "pending" | "paid" | "draft";
  paymentTerm: 1 | 7 | 14 | 30;
  clientName: string;
  clientEmail: string;
  projectDescription?: string;
  createdAt?: Date | string;
  billFrom: Address;
  billTo: Address;
  items: Item[];
}[] = [
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    projectDescription: "project description placeholder",
    billFrom: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    billTo: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Banner Design",
        quantity: 1,
        price: 156,
      },
      {
        name: "Email Design",
        quantity: 2,
        price: 200,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Emma Watson",
    clientEmail: "emma.watson@designco.com",
    projectDescription: "E-commerce Website",
    createdAt: "2025-03-01T09:15:00Z",
    billFrom: {
      street: "12 Regent Street",
      city: "London",
      postCode: "W1B 3AA",
      country: "United Kingdom",
    },
    billTo: {
      street: "45 Kings Road",
      city: "Brighton",
      postCode: "BN1 2FG",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Website Design",
        quantity: 1,
        price: 1200,
      },
      {
        name: "Product Photography",
        quantity: 2,
        price: 250,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 14,
    clientName: "James Carter",
    clientEmail: "james.carter@techbit.com",
    billFrom: {
      street: "78 Oxford Road",
      city: "Manchester",
      postCode: "M1 5NH",
      country: "United Kingdom",
    },
    billTo: {
      street: "23 Victoria Street",
      city: "Liverpool",
      postCode: "L1 6BD",
      country: "United Kingdom",
    },
    items: [
      {
        name: "UI/UX Design",
        quantity: 1,
        price: 900,
      },
      {
        name: "API Integration",
        quantity: 1,
        price: 1500,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 7,
    clientName: "Olivia Patel",
    clientEmail: "olivia.patel@creative.com",
    projectDescription: "Brand Identity",
    billFrom: {
      street: "34 Park Lane",
      city: "Birmingham",
      postCode: "B2 4QA",
      country: "United Kingdom",
    },
    billTo: {
      street: "89 George Street",
      city: "Edinburgh",
      postCode: "EH2 3ES",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Logo Creation",
        quantity: 1,
        price: 450,
      },
      {
        name: "Business Cards",
        quantity: 3,
        price: 75,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 1,
    clientName: "Thomas Reed",
    clientEmail: "thomas.reed@startup.io",
    createdAt: "2025-03-04T16:20:00Z",
    billFrom: {
      street: "56 High Street",
      city: "Bristol",
      postCode: "BS1 2AZ",
      country: "United Kingdom",
    },
    billTo: {
      street: "101 Castle Road",
      city: "Nottingham",
      postCode: "NG1 6AA",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Web Development",
        quantity: 1,
        price: 800,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 14,
    clientName: "Sophie Nguyen",
    clientEmail: "sophie.nguyen@market.com",
    projectDescription: "Social Media Campaign",
    createdAt: "2025-03-05T10:00:00Z",
    billFrom: {
      street: "22 Church Lane",
      city: "Leeds",
      postCode: "LS1 2SJ",
      country: "United Kingdom",
    },
    billTo: {
      street: "67 Albert Road",
      city: "Glasgow",
      postCode: "G42 8DP",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Content Creation",
        quantity: 2,
        price: 300,
      },
      {
        name: "Ad Design",
        quantity: 3,
        price: 150,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 7,
    clientName: "Liam Brooks",
    clientEmail: "liam.brooks@innovate.com",
    billFrom: {
      street: "91 Station Road",
      city: "Sheffield",
      postCode: "S1 2GF",
      country: "United Kingdom",
    },
    billTo: {
      street: "14 Mill Lane",
      city: "Newcastle",
      postCode: "NE1 5RD",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Keyword Research",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Ava Morales",
    clientEmail: "ava.morales@digital.com",
    projectDescription: "Video Editing",
    createdAt: "2025-03-07T15:30:00Z",
    billFrom: {
      street: "33 Bridge Street",
      city: "Cambridge",
      postCode: "CB2 1UW",
      country: "United Kingdom",
    },
    billTo: {
      street: "50 Elm Grove",
      city: "Oxford",
      postCode: "OX1 2PB",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Video Production",
        quantity: 1,
        price: 600,
      },
      {
        name: "Motion Graphics",
        quantity: 2,
        price: 200,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 1,
    clientName: "Noah Kim",
    clientEmail: "noah.kim@enterprise.com",
    billFrom: {
      street: "88 Queen’s Road",
      city: "Reading",
      postCode: "RG1 4DG",
      country: "United Kingdom",
    },
    billTo: {
      street: "27 Union Street",
      city: "Cardiff",
      postCode: "CF10 1ET",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Software Setup",
        quantity: 1,
        price: 1100,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 7,
    clientName: "Isabella Ford",
    clientEmail: "isabella.ford@agency.com",
    projectDescription: "Email Marketing",
    billFrom: {
      street: "19 Duke Street",
      city: "Southampton",
      postCode: "SO14 3EZ",
      country: "United Kingdom",
    },
    billTo: {
      street: "62 West End",
      city: "Plymouth",
      postCode: "PL1 5HH",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Email Template",
        quantity: 2,
        price: 175,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Ethan Hayes",
    clientEmail: "ethan.hayes@solutions.com",
    createdAt: "2025-03-10T11:00:00Z",
    billFrom: {
      street: "41 St John’s Road",
      city: "Bath",
      postCode: "BA1 2PZ",
      country: "United Kingdom",
    },
    billTo: {
      street: "73 Clarence Street",
      city: "Swansea",
      postCode: "SA1 3FT",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Server Configuration",
        quantity: 1,
        price: 350,
      },
      {
        name: "Domain Registration",
        quantity: 1,
        price: 50,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 14,
    clientName: "Mia Sullivan",
    clientEmail: "mia.sullivan@consult.com",
    projectDescription: "Graphic Design",
    billFrom: {
      street: "15 Grove Road",
      city: "Norwich",
      postCode: "NR1 3RQ",
      country: "United Kingdom",
    },
    billTo: {
      street: "38 Harbour Way",
      city: "Belfast",
      postCode: "BT1 2DX",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Poster Design",
        quantity: 3,
        price: 100,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 1,
    clientName: "Lucas Bennett",
    clientEmail: "lucas.bennett@studio.com",
    createdAt: "2025-03-12T14:45:00Z",
    billFrom: {
      street: "29 Windsor Avenue",
      city: "Derby",
      postCode: "DE1 2PL",
      country: "United Kingdom",
    },
    billTo: {
      street: "84 Market Street",
      city: "Leicester",
      postCode: "LE1 6DP",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Wireframes",
        quantity: 1,
        price: 500,
      },
      {
        name: "Mockups",
        quantity: 2,
        price: 225,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Charlotte Evans",
    clientEmail: "charlotte.evans@brand.com",
    projectDescription: "Packaging Design",
    createdAt: "2025-03-13T12:15:00Z",
    billFrom: {
      street: "66 Hill Street",
      city: "Coventry",
      postCode: "CV1 4AN",
      country: "United Kingdom",
    },
    billTo: {
      street: "11 Rose Lane",
      city: "Hull",
      postCode: "HU1 2PA",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Package Artwork",
        quantity: 1,
        price: 700,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 14,
    clientName: "Henry Ortiz",
    clientEmail: "henry.ortiz@tech.com",
    billFrom: {
      street: "52 Lime Street",
      city: "Exeter",
      postCode: "EX4 3LD",
      country: "United Kingdom",
    },
    billTo: {
      street: "93 York Road",
      city: "Portsmouth",
      postCode: "PO1 5DR",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Data Transfer",
        quantity: 1,
        price: 950,
      },
      {
        name: "Testing",
        quantity: 1,
        price: 300,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 7,
    clientName: "Amelia Gray",
    clientEmail: "amelia.gray@media.com",
    projectDescription: "Animation",
    billFrom: {
      street: "77 Cedar Avenue",
      city: "York",
      postCode: "YO1 9TX",
      country: "United Kingdom",
    },
    billTo: {
      street: "20 Pine Street",
      city: "Dundee",
      postCode: "DD1 4BN",
      country: "United Kingdom",
    },
    items: [
      {
        name: "3D Animation",
        quantity: 1,
        price: 800,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Jack Phillips",
    clientEmail: "jack.phillips@systems.com",
    createdAt: "2025-03-16T10:30:00Z",
    billFrom: {
      street: "44 Maple Road",
      city: "Preston",
      postCode: "PR1 2RA",
      country: "United Kingdom",
    },
    billTo: {
      street: "58 Oak Lane",
      city: "Aberdeen",
      postCode: "AB11 6DX",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Security Assessment",
        quantity: 1,
        price: 650,
      },
      {
        name: "Report Writing",
        quantity: 1,
        price: 200,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 1,
    clientName: "Lily Turner",
    clientEmail: "lily.turner@events.com",
    projectDescription: "Event Branding",
    createdAt: "2025-03-17T09:30:00Z",
    billFrom: {
      street: "31 Birch Avenue",
      city: "Luton",
      postCode: "LU1 4BZ",
      country: "United Kingdom",
    },
    billTo: {
      street: "69 Ash Road",
      city: "Wolverhampton",
      postCode: "WV1 2PN",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Event Logo",
        quantity: 1,
        price: 350,
      },
      {
        name: "Banners",
        quantity: 2,
        price: 150,
      },
    ],
  },
  {
    status: "draft",
    paymentTerm: 7,
    clientName: "Mason Lee",
    clientEmail: "mason.lee@software.com",
    billFrom: {
      street: "82 Poplar Street",
      city: "Blackpool",
      postCode: "FY1 1JL",
      country: "United Kingdom",
    },
    billTo: {
      street: "17 Cherry Lane",
      city: "Stoke-on-Trent",
      postCode: "ST1 2NJ",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Code Review",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    status: "pending",
    paymentTerm: 30,
    clientName: "Harper Diaz",
    clientEmail: "harper.diaz@marketing.com",
    projectDescription: "PPC Campaign",
    billFrom: {
      street: "25 Willow Drive",
      city: "Sunderland",
      postCode: "SR1 3ND",
      country: "United Kingdom",
    },
    billTo: {
      street: "40 Hazel Road",
      city: "Middlesbrough",
      postCode: "TS1 5EF",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Ad Setup",
        quantity: 1,
        price: 500,
      },
      {
        name: "Analytics",
        quantity: 1,
        price: 250,
      },
    ],
  },
  {
    status: "paid",
    paymentTerm: 14,
    clientName: "Elijah Wood",
    clientEmail: "elijah.wood@prod.com",
    createdAt: "2025-03-20T13:00:00Z",
    billFrom: {
      street: "63 Spruce Street",
      city: "Bradford",
      postCode: "BD1 2HU",
      country: "United Kingdom",
    },
    billTo: {
      street: "99 Sycamore Avenue",
      city: "Chester",
      postCode: "CH1 4LY",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Launch Strategy",
        quantity: 1,
        price: 1000,
      },
      {
        name: "Promo Materials",
        quantity: 2,
        price: 300,
      },
    ],
  },
];

export async function seed(db: Kysely<DB>): Promise<void> {
  for (const invoice of invoices) {
    const [{ id: invoiceId }] = await db
      .insertInto("invoices")
      .values([
        {
          status: invoice.status,
          paymentTerm: invoice.paymentTerm,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          projectDescription: invoice.projectDescription,
        },
      ])
      .returning("id")
      .execute();
    await Promise.allSettled([
      db
        .insertInto("invoiceAddresses")
        .values([
          {
            ...invoice.billFrom,
            type: "from",
            invoiceId,
          },
          {
            ...invoice.billTo,
            type: "to",
            invoiceId,
          },
        ])
        .execute(),
      db
        .insertInto("items")
        .values(invoice.items.map((item) => ({ ...item, invoiceId })))
        .execute(),
    ]);
  }
}

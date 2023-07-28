import { Appointment } from "../types/Appointment";
import { Barber } from "../types/Barber";
import { Service } from "../types/Service";

export const appointmentsBd:Appointment[] = [
    {
        title: "Website Re-Design Plan",
        barberId: "2",
        startDate: new Date(2023, 6, 28, 9, 30),
        endDate: new Date(2023, 6, 28, 10, 30),
        id: 0,
        serviceId: "1",
        clientId: "1",
        
        
    },
    {
        title: "Book Flights to San Fran for Sales Trip",
        barberId: "1",
        startDate: new Date(2023, 6, 28, 8, 0),
        endDate: new Date(2023, 6, 28, 9, 0),
        id: 1,        
        serviceId:"4" ,
        clientId: "2",
        
    },
    {
        title: "Install New Router in Dev Room",
        barberId: "3",
        startDate: new Date(2023, 6, 19, 10, 30),
        endDate: new Date(2023, 6, 19, 12, 0),
        id: 2,        
        serviceId: "2",
        clientId: "3",      
    },
    {
        title: "New Brochures",
        barberId: "2",
        startDate: new Date(2023, 6, 28, 10, 45),
        endDate: new Date(2023, 6, 28, 11, 0),
        id: 5,        
        serviceId:"4" ,
        clientId: "4",
        
    },
    {
        title: "Install New Database",
        barberId: "1",
        startDate: new Date(2023, 6, 21, 9, 30),
        endDate: new Date(2023, 6, 21, 10, 30),
        id: 6,        
        serviceId: "3",
        clientId: "5",
        
    },
    {
        title: "Approve New Online Marketing Strategy",
        barberId: "3",
        startDate: new Date(2023, 6, 18, 9, 30),
        endDate: new Date(2023, 6, 18, 10, 30),
        id: 7,        
        serviceId: "1",
        clientId: "6",
        
    },
    {
        title: "Upgrade Personal Computers",
        barberId: "1",
        startDate: new Date(2023, 4, 7, 9),
        endDate: new Date(2023, 4, 7, 11, 30),
        id: 8,        
        serviceId: "3",
        clientId: "1",
        
    },
    {
        title: "Prepare 2023 Marketing Plan",
        barberId: "2",
        startDate: new Date(2023, 4, 10, 11, 0),
        endDate: new Date(2023, 4, 10, 13, 30),
        id: 9,        
        serviceId: "4",
        clientId: "4",
        
    },
    {
        title: "Brochure Design Review",
        barberId: "3",
        startDate: new Date(2023, 4, 9, 11, 0),
        endDate: new Date(2023, 4, 9, 13, 30),
        id: 10,        
        serviceId: "2",
        clientId: "2",
        
    },
    {
        title: "Upgrade Server Hardware",
        barberId: "1",
        startDate: new Date(2023, 4, 11, 9, 0),
        endDate: new Date(2023, 4, 11, 15, 0),
        id: 11,        
        serviceId:"4" ,
        clientId: "3",
        
    },
    {
        title: "Submit New Website Design",
        barberId: "2",
        startDate: new Date(2023, 4, 11, 16, 30),
        endDate: new Date(2023, 4, 11, 18, 0),
        id: 12,      
        serviceId: "3",
        clientId: "5",
        
    },
    {
        title: "Launch New Website",
        barberId: "3",
        startDate: new Date(2023, 4, 11, 12, 20),
        endDate: new Date(2023, 4, 11, 14, 0),
        id: 13,
        serviceId:"2" ,
        clientId: "5",
        
    },
    {
        title: "Google AdWords Strategy",
        barberId: "1",
        startDate: new Date(2023, 4, 14, 9, 0, 0),
        endDate: new Date(2023, 4, 14, 12, 0, 0),
        id: 14,
        serviceId: "1",
        clientId: "3",
        
    },
    {
        title: "Rollout of New Website and Marketing Brochures",
        barberId: "1",
        startDate: new Date(2023, 4, 14, 13, 0, 0),
        endDate: new Date(2023, 4, 14, 15, 30, 0),
        id: 15,
        serviceId:"4" ,
        clientId: "3",
        
    },
    {
        title: "Non-Compete Agreements",
        barberId: "3",
        startDate: new Date(2023, 4, 15, 13, 0, 0),
        endDate: new Date(2023, 4, 15, 15, 45, 0),
        id: 16,
        serviceId:"1" ,
        clientId: "6",
        
    },
    {
        title: "Approve Hiring of John Jeffers",
        barberId: "2",
        startDate: new Date(2023, 4, 15, 9, 0, 0),
        endDate: new Date(2023, 4, 15, 12, 0, 0),
        id: 17,
        serviceId:"2" ,
        clientId: "5",
        
    },
    {
        title: "Update NDA Agreement",
        barberId: "1",
        startDate: new Date(2023, 4, 15, 11, 0, 0),
        endDate: new Date(2023, 4, 15, 14, 15, 0),
        id: 18,
        serviceId: "4",
        clientId: "3",
        
    },
    {
        title: "Submit Signed NDA",
        barberId: "3",
        startDate: new Date(2023, 4, 16, 13, 0, 0),
        endDate: new Date(2023, 4, 16, 15, 0, 0),
        id: 21,
        serviceId: "3",
        clientId: "2",
        
    },
    {
        title: "Review Revenue Projections",
        barberId: "2",
        startDate: new Date(2023, 4, 16, 11, 0, 0),
        endDate: new Date(2023, 4, 16, 14, 0, 0),
        id: 22,
        serviceId: "2",
        clientId: "1",
        
    },
    {
        title: "Comment on Revenue Projections",
        barberId: "2",
        startDate: new Date(2023, 4, 14, 10, 0, 0),
        endDate: new Date(2023, 4, 14, 13, 0, 0),
        id: 23,
        serviceId: "1" ,
        clientId: "4",
        
    }
];

export const servicesBd: Service[] = [
    {
        id: "1",
        name: "corte de pelo",
        duration: 30,
        image: "",
        price: 800,
        description: "corte de pelo ya sea clasico o con degradado. No incluye diseño/lavado",
    },

    {
        id: "2",
        name: "corte Premium",
        duration: 45,
        image: "",
        price: 800,
        description:
            "Corte de pelo ya sea clasico o degradado con un margen de trabajo mas amplio asesoramiento de visagismo y productos premium para un acabado aun mas profesional.",
    },
    {
        id: "3",
        name: "arreglo de barba",
        duration: 60,
        image: "",
        price: 800,
        description: "Arreglo de barba con disminucion, afeitado completo y/o perfilado.",
    },
    {
        id: "4",
        name: "afeitado tradicional",
        duration: 30,
        image: "",
        price: 800,
        description:
            "ageitado o arreglo de barba con el metodo tradicional, toallas calientes/frias y vapor de ozono.",
    },
    {
        id: "5",
        name: "corte niño",
        duration: 60,
        image: "",
        price: 800,
        description: "Corte de pelo clasico o degradado para niños hasta 12 años ",
    },
    {
        id: "6",
        name: "perfilado de cejas",
        duration: 45,
        image: "",
        price: 800,
        description:
            "Arrego de cejas con disminucion, utilizamos tecnicas especializadas para que tus cejas queden implecables.",
    },
];
export const barbersBd: Barber[] = [
    {
        id: "1",
        name: "Alan",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
    {
        id: "2",
        name: "Juan",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
    {
        id: "3",
        name: "Jorge",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
    {
        id: "4",
        name: "Emiliano",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
    {
        id: "5",
        name: "Ernesto",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
    {
        id: "6",
        name: "Lorenzo",
        description: "cuento con 5 años de experiencia, animate te espero",
        avatar: "",
    },
];
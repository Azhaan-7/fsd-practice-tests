import type { NextApiRequest, NextApiResponse } from "next";

type ServiceType = "consultation" | "support" | "installation";

const prices: Record<ServiceType, number> = {
    consultation: 80,
    support: 120,
    installation: 200,
};

export default function handler(req: NextApiRequest, res: NextApiResponse){

    const { serviceType } = req.query;
    if (typeof serviceType !== "string"){
        return res.status(400).json({ message: "Service type is required. "});
    }
    if (!(serviceType in prices)) {
        return res.status(400).json({message: "Invalid service type. "});
    }

    return res.status(200).json({
        serviceType,
        price: prices[serviceType as ServiceType],
    });
}
import type { NextApiRequest, NextApiResponse } from "next";

type ServiceType = "standard" | "premium" | "express";

const prices: Record<ServiceType, number> = {
  standard: 80,
  premium: 140,
  express: 220,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serviceType } = req.query;

  if (typeof serviceType !== "string") {
    return res.status(400).json({ message: "Service type is required." });
  }

  if (!(serviceType in prices)) {
    return res.status(400).json({ message: "Invalid service type." });
  }

  return res.status(200).json({
    serviceType,
    price: prices[serviceType as ServiceType],
  });
}
import { getAllPortfolio } from "@/services/event-portfolio-services";
import EventPortfolioClient from "./event-portfolio-client";



export default async function EventPortfolioPage() {
  // SSR Fetch
  const portfolios = await getAllPortfolio();

  return <EventPortfolioClient portfolios={portfolios} />;
}

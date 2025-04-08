import { IListingRepository } from "@repo/business/listing/listing-repository-interface";
import { Listing } from "@repo/shared/schemas/listing-schema";

export class ListingRepository implements IListingRepository {
  listings: Listing[] = [
    {
      id: 1,
      title: "Toyota Corolla",
      description: "Een betrouwbare auto met een laag brandstofverbruik.",
      minimumBidPrice: 15000,
      mileage: 50000,
      licensePlate: "AB-123-CD",
      brand: "Toyota",
      model: "Corolla",
      manufactureDate: 2018,
      fuelType: "Benzine",
      transmission: "Handgeschakeld",
      location: "Amsterdam",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dagen later
    },
    {
      id: 2,
      title: "Toyota Corolla",
      description: "Een betrouwbare auto met een laag brandstofverbruik.",
      minimumBidPrice: 15000,
      mileage: 50000,
      licensePlate: "AB-123-CD",
      brand: "Toyota",
      model: "Corolla",
      manufactureDate: 2018,
      fuelType: "Benzine",
      transmission: "Handgeschakeld",
      location: "Amsterdam",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 dagen later
    },
    {
      id: 3,
      title: "Old Toyota Corolla",
      description: "Een betrouwbare auto met een laag brandstofverbruik.",
      minimumBidPrice: 15000,
      mileage: 50000,
      licensePlate: "AB-123-CD",
      brand: "Toyota",
      model: "Corolla",
      manufactureDate: 2018,
      fuelType: "Benzine",
      transmission: "Handgeschakeld",
      location: "Amsterdam",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 dagen in verleden
    },
    {
      id: 4,
      title: "Honda Civic",
      description: "Een sportieve en zuinige auto.",
      minimumBidPrice: 18000,
      mileage: 30000,
      licensePlate: "EF-456-GH",
      brand: "Honda",
      model: "Civic",
      manufactureDate: 2020,
      fuelType: "Hybride",
      transmission: "Automaat",
      location: "Rotterdam",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dagen later
    },
    {
      id: 5,
      title: "Volkswagen Golf",
      description: "Een populaire hatchback met veel ruimte.",
      minimumBidPrice: 20000,
      mileage: 40000,
      licensePlate: "IJ-789-KL",
      brand: "Volkswagen",
      model: "Golf",
      manufactureDate: 2019,
      fuelType: "Diesel",
      transmission: "Handgeschakeld",
      location: "Utrecht",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dagen later
    },
    {
      id: 6,
      title: "Tesla Model 3",
      description: "Een volledig elektrische auto met geavanceerde functies.",
      minimumBidPrice: 35000,
      mileage: 20000,
      licensePlate: "MN-012-OP",
      brand: "Tesla",
      model: "Model 3",
      manufactureDate: 2021,
      fuelType: "Elektrisch",
      transmission: "Automaat",
      location: "Den Haag",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dagen later
    },
    {
      id: 7,
      title: "Ford Fiesta",
      description: "Een compacte en wendbare stadsauto.",
      minimumBidPrice: 12000,
      mileage: 60000,
      licensePlate: "QR-345-ST",
      brand: "Ford",
      model: "Fiesta",
      manufactureDate: 2017,
      fuelType: "Benzine",
      transmission: "Handgeschakeld",
      location: "Eindhoven",
      createdAt: new Date(),
      updatedAt: null,
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dagen in verleden
    },
  ];

  async getRecommendedListings(): Promise<Listing[]> {
    const recommendedListings = this.listings
      .filter((listing) => listing.endDate > new Date())
      .sort((a, b) => {
        return (
          Math.abs(new Date(a.endDate).getTime() - Date.now()) -
          Math.abs(new Date(b.endDate).getTime() - Date.now())
        );
      })
      .slice(0, 3);

    return recommendedListings;
  }

  getListingById(id: number): Promise<Listing | undefined> {
    const listing = this.listings.find((listing) => Number(listing.id) === id);
    return Promise.resolve(listing);
  }

  getAllListings(): Promise<Listing[]> {
    return Promise.resolve(this.listings);
  }
}

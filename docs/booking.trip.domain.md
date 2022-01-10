# Booking Trip Domain

> Travelers book tickets for the trips offered by operators

## Events

- **Trip** offered by the **Operator**
- **Booking** confirmed by **Traveler**

## Concepts

- **Trip** a journey with flight and optionally staying
- **Booking** a reservation to trip for one or more passengers
- **Ticket** a passenger pass
- **Traveler** someone who books a trip
- **VIP Traveler** a traveler that already booked 2 or more trips
- **Passenger** someone that travels
- **Operator** a company that offers trips

## Processes

- Notify **Trip** offer to every **VIP Traveler** by email
- Publish **Trip** offer on the web
- Notify every **Booking** to the **Operator**
- Ask **Operator** for **Passenger** availability

## Rules

- Any **Traveler** can book tickets up to 4 passengers per trip
- Any **VIP Traveler** can book tickets up to 6 passengers per trip

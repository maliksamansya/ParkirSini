'use strict';

const { hashPassword } = require('../helpers/bcrypt');
const data = require('../db.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // data.landlords.forEach(landlord => {
        //     delete landlord.id;
        //     landlord.password = hashPassword(landlord.password);
        //     landlord.createdAt = landlord.updatedAt = new Date();
        // });

        data.customers.forEach(customer => {
            delete customer.id;
            customer.password = hashPassword(customer.password);
            customer.createdAt = customer.updatedAt = new Date();
        });

        // data.facilities.forEach(facility => {
        //     delete facility.id;
        //     facility.createdAt = facility.updatedAt = new Date();
        // });

        // data.parkingSpaces.forEach(parkingSpace => {
        //     delete parkingSpace.id;
        //     parkingSpace.createdAt = parkingSpace.updatedAt = new Date();
        // });

        // data.facilityParking.forEach(facilityParking => {
        //     delete facilityParking.id;
        //     facilityParking.createdAt = facilityParking.updatedAt = new Date();
        // });

        // data.bookings.forEach(booking => {
        //     delete booking.id;
        //     booking.createdAt = booking.updatedAt = new Date();
        // });

        // data.parkingSpaceReviews.forEach(review => {
        //     delete review.id;
        //     review.createdAt = review.updatedAt = new Date();
        // });

        // const parkingSpaceImages = [
        //     {
        //         parkingSpaceId: 1,
        //         imgUrl: 'path/to/image1.jpg',
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     },
        //     {
        //         parkingSpaceId: 2,
        //         imgUrl: 'path/to/image2.jpg',
        //         createdAt: new Date(),
        //         updatedAt: new Date()
        //     }
        // ];

        // await queryInterface.bulkInsert('Landlords', data.landlords, {});
        await queryInterface.bulkInsert('Customers', data.customers, {});
        // await queryInterface.bulkInsert('Facilities', data.facilities, {});
        // await queryInterface.bulkInsert('ParkingSpaces', data.parkingSpaces, {});
        // await queryInterface.bulkInsert('FacilityParkings', data.facilityParking, {});
        // await queryInterface.bulkInsert('Bookings', data.bookings, {});
        // await queryInterface.bulkInsert('ParkingSpaceReviews', data.parkingSpaceReviews, {});
        // await queryInterface.bulkInsert('ParkingSpaceImages', parkingSpaceImages, {});
    },

    async down(queryInterface, Sequelize) {
        // await queryInterface.bulkDelete('ParkingSpaceImages', null, {});
        // await queryInterface.bulkDelete('ParkingSpaceReviews', null, {});
        // await queryInterface.bulkDelete('Bookings', null, {});
        // await queryInterface.bulkDelete('FacilityParkings', null, {});
        // await queryInterface.bulkDelete('ParkingSpaces', null, {});
        // await queryInterface.bulkDelete('Facilities', null, {});
        await queryInterface.bulkDelete('Customers', null, {});
        // await queryInterface.bulkDelete('Landlords', null, {});
    }
};


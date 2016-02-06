# -*-coding: utf-8 -*-

from pymongo import MongoClient
from pprint import pprint
import matplotlib.pyplot as plt


class Flights:
    def __init__(self):
        '''
        Set up database connection and get self.db (flights).
        '''
        client = MongoClient('mongodb://localhost:27017/')
        self.db = client['flights']

    def getFlightCancelsByDay(self):
        '''
        Get a collection of cancellation per day for each airport.

        Function pipeline structure:
            1. Get all Cancelled flights with origin != 'NA'
            2. Group by Origin and Date, sum Cancelled.
            3. Project Origin, Cancelled, Date, Reasoncode.
            4. Sort by Cancellations.
            5. Write to a new collection.
        '''
        pipeline = [
            {
                '$match': {
                    'Cancelled': 1,
                    'Origin': {'$ne': 'NA'}
                }
            },
            {'$group': {
                '_id': {'Origin': '$Origin',
                        'DayOfYear': {'$dayOfYear': '$Date'}},
                'cancelledTotal': {'$sum': '$Cancelled'},
                'cancelledCarrier': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'A'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledWeather': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'B'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledNAS': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'C'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledSecurity': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'D'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
            }
            },
            {
                '$project': {
                    'Origin': '$_id.Origin',
                    'DayOfYear': '$_id.DayOfYear',
                    'cancelledTotal': 1,
                    'cancelledCarrier': 1,
                    'cancelledWeather': 1,
                    'cancelledNAS': 1,
                    'cancelledSecurity': 1,
                    '_id': 0
                }
            },
            {'$sort': {'cancelledTotal': -1}},
            {'$out': 'flights_cancellations_byday'}
        ]
        self.db.flights.aggregate(pipeline)

    def getCancelledPorts(self):
        '''
        Get a collection of all cancellations for each airport.

        Function pipeline structure:
            1. Group by Origin. Sum Cancellations.
            2. Project _id to origin.
            3. Sort by cancellations.
            4. Save collection
        '''
        pipeline = [
            {
                '$group': {
                    '_id': '$Origin',
                    'cancelledTotal': {'$sum': '$cancelledTotal'},
                    'cancelledCarrier': {'$sum': '$cancelledCarrier'},
                    'cancelledWeather': {'$sum': '$cancelledWeather'},
                    'cancelledNAS': {'$sum': '$cancelledNAS'},
                    'cancelledSecurity': {'$sum': '$cancelledSecurity'}
                }
            },
            {
                '$project': {
                    'Origin': '$_id',
                    'cancelledTotal': 1,
                    'cancelledCarrier': 1,
                    'cancelledWeather': 1,
                    'cancelledNAS': 1,
                    'cancelledSecurity': 1,
                    '_id': 0
                }
            },
            {'$sort': {'cancelledTotal': -1}},
            {'$out': 'flights_cancellations'}
        ]
        self.db.flights_cancellations_byday.aggregate(pipeline)

    def getTopCancelledPorts(self):
        '''
        Get a collection of top cancellations by airport.

        Function pipeline structure:
            1. Match all total cancellations with over 2000 cancels.
            2. Save collection
        '''
        pipeline = [
            {
                '$match': {
                    'cancelledTotal': {'$gte': 2800}
                }
            },
            {'$out': 'top_flights_cancellations'}
        ]
        self.db.flights_cancellations.aggregate(pipeline)

    def getTopPortsFlightCancelsByDay(self):
        '''
        Get all cancellations by day from top airports.

        Function pipeline structure:
            1. Match Origin on topAirports.
            2. Save collection.
        '''

        # Get top airports from top_flights_cancellations:
        cursor = self.db.top_flights_cancellations.find(
            {},
            {'Origin': 1, '_id': 0}
        )
        # Make cursor into a list of its values:
        topAirports = []
        for ptr in cursor:
            topAirports.append(ptr['Origin'])

        pipeline = [
            {
                '$match': {
                    'Origin': {'$in': topAirports}
                }
            },
            {'$out': 'top_flights_cancellations_byday'}
        ]
        self.db.flights_cancellations_byday.aggregate(pipeline)

    def getFlightCancelsByWeek(self):
        '''
        Get a collection of cancellation per week for each airport.

        Function pipeline structure:
            1. Get all Cancelled flights with origin != 'NA'
            2. Group by Origin and Date, sum Cancelled.
            3. Project Origin, Cancelled, Date, Reasoncode.
            4. Sort by Cancellations.
            5. Write to a new collection.
        '''
        pipeline = [
            {
                '$match': {
                    'Cancelled': 1,
                    'Origin': {'$ne': 'NA'}
                }
            },
            {'$group': {
                '_id': {'Origin': '$Origin',
                        'WeekOfYear': {'$week': '$Date'}},
                'cancelledTotal': {'$sum': '$Cancelled'},
                'cancelledCarrier': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'A'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledWeather': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'B'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledNAS': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'C'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
                'cancelledSecurity': {
                    '$sum': {
                        '$cond': [
                            {
                                '$eq': [
                                    '$CancellationCode',
                                    'D'
                                ]
                            },
                            1,
                            0
                        ]
                    }
                },
            }
            },
            {
                '$project': {
                    'Origin': '$_id.Origin',
                    'WeekOfYear': '$_id.WeekOfYear',
                    'cancelledTotal': 1,
                    'cancelledCarrier': 1,
                    'cancelledWeather': 1,
                    'cancelledNAS': 1,
                    'cancelledSecurity': 1,
                    '_id': 0
                }
            },
            {'$sort': {'cancelledTotal': -1}},
            {'$out': 'flights_cancellations_byweek'}
        ]
        self.db.flights.aggregate(pipeline)

    def getFlightCancelsByMonth(self):
        '''
        Get a collection of cancellation per month for each airport.

        Function pipeline structure:
            1. Get all Cancelled flights with origin != 'NA'
            2. Group by Origin and Date, sum Cancelled.
            3. Project Origin, Cancelled, Date, Reasoncode.
            4. Sort by Cancellations.
            5. Write to a new collection.
        '''
        pipeline = [
            {
                '$match': {
                    'Cancelled': 1,
                    'Origin': {'$ne': 'NA'}
                }
            },
            {'$group': {
                '_id': {'Origin': '$Origin',
                        'MonthOfYear': {'$month': '$Date'},
                        'CancellationCode': '$CancellationCode'
                 },
                'Cancelled': {'$sum': '$Cancelled'},
            }
            },
            {
                '$project': {
                    'Origin': '$_id.Origin',
                    'MonthOfYear': '$_id.MonthOfYear',
                    'CancellationType': '$_id.CancellationCode',
                    'Cancelled': 1,
                    '_id': 0
                }
            },
            {'$sort': {'Origin': -1}},
            {'$out': 'flights_cancellations_bymonth'}
        ]
        self.db.flights.aggregate(pipeline)

    def getTopFlightCancelsByWeek(self):
        '''
        Get top flight cancels by day. The top flight cancels are defined in
        getTopCancelledPorts()-function.
        '''

        # Get top airports from top_flights_cancellations:
        cursor = self.db.top_flights_cancellations.find(
            {},
            {'Origin': 1, '_id': 0}
        )
        # Make cursor into a list of its values:
        topAirports = []
        for ptr in cursor:
            topAirports.append(ptr['Origin'])

        pipeline = [
            {
                '$match': {
                    'Origin': {'$in': topAirports}
                }
            },
            {'$out': 'top_flights_cancellations_byweek'}
        ]
        self.db.flights_cancellations_byweek.aggregate(pipeline)


    def getSummaryFlightCancelsByMonth(self):
        pipeline = [
            {'$group': {
                '_id': {'MonthOfYear': '$MonthOfYear',
                        'CancellationType': '$CancellationType'
                 },
                'Cancelled': {'$sum': '$Cancelled'},
            }
            },
            {
                '$project': {
                    'MonthOfYear': '$_id.MonthOfYear',
                    'CancellationType': '$_id.CancellationType',
                    'Cancelled': 1,
                    '_id': 0
                }
            },
            {'$sort': {'MonthOfYear': 1}},
            {'$out': 'summary_flights_cancellations_bymonth'}
        ]
        self.db.flights_cancellations_bymonth.aggregate(pipeline)
    def getTopFlightCancelsByMonth(self):
        '''
        Get top flight cancels by day. The top flight cancels are defined in
        getTopCancelledPorts()-function.
        '''

        # Get top airports from top_flights_cancellations:
        cursor = self.db.top_flights_cancellations.find(
            {},
            {'Origin': 1, '_id': 0}
        )
        # Make cursor into a list of its values:
        topAirports = []
        for ptr in cursor:
            topAirports.append(ptr['Origin'])

        pipeline = [
            {
                '$match': {
                    'Origin': {'$in': ['ORD', 'ATL', 'LGA', 'DFW', 'IAH', 'EWR', 'BOS', 'LAX', 'JFK']}
                }
            },
            {'$out': 'top_flights_cancellations_bymonth'}
        ]
        self.db.flights_cancellations_bymonth.aggregate(pipeline)


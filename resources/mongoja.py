
# -*- coding: utf-8 -*-

from pymongo import MongoClient
from bson.son import SON
from pprint import pprint
import matplotlib.pyplot as plt

def flights():
    client = MongoClient()
    client = MongoClient('mongodb://localhost:27017/')
    db = client['flights']
    return db.flights

def flightCancelsByDay():
    '''
    Function pipeline structure:
        1. Get all Cancelled flights with origin != 'NA'
        2. Group by Origin and Date, sum Cancelled.
        3. Project Origin, Cancelled, Date.
        4. Sort by Cancellations.
        5. Write to a new collection.
    '''
    db.flights = init()
    pipeline = [
        {'$match': {
                'Cancelled': 1,
                'Origin': {'$ne': 'NA'}
                }
         },
        {'$group' : {
                '_id': {'Origin': '$Origin', 'DayOfYear': {'$dayOfYear': '$Date'} },
                'cancellationByDateOrigin': { '$sum': '$Cancelled' }
                }
         },
        {'$project': {
                'Origin': '$_id.Origin',
                'cancellationByDateOrigin': 1,
                'DayOfYear': '$_id.DayOfYear',
                '_id': 0
                }
         },
        {'$sort': { 'cancellationByDateOrigin': -1 } },
        {'$out': 'flights_cancellations_byday' }
    ]
    flights().aggregate(pipeline)

def getTopCancelledPorts():
    

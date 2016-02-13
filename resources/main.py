from flights import Flights

flights = Flights()
'''
Can also call:
- flights.getCancelledPorts()
- flights.getFlightCancelsByDay()
- flights.getFlightCancelsByWeek()
- flights.getTopCancelledPorts()
- flights.getTopPortsFlightCancelsByDay()
- flights.getTopFlightCancelsByWeek()
- flights.getFlightCancelsByMonth()
'''
flights.getSummaryFlightCancelsByMonth()
flights.totalFlightsByMonth()

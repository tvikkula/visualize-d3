Summary:
The visualization investigates how the cancellations are occuring during the year for several airports with the most cancellations. It also displays the different reasons for the cancellations (Carrier, Weather, NAS or Security). This visualization helps understand when cancellations happen, and more importantly: why.

Design:
The original idea of the visualization was to display time series trends in flight cancellations within the scope of a single year. A single year was decided because the size of the single year dataset seemed fitting for the hardware available. Using a larger dataset would have been interesting, however a single years dataset already contained over 11GB of data.

It was discovered, however, that there are little timeseries trends found in the data. Despite the lack of trends, the data is still displayed as a time series as that was deemed a neat way to display single events of cancellations.

Since the visualization of time series by itself did not yeild interesting discoveries, the different types of cancellations was added. This gives context to visualization as to what why the flights were cancelled at certain points of time, and that to me was interesting. To that end, the visualization was animated to a selection was added to toggle between different types of cancellations to discover the reasons for high periods of cancellations in the visualization. Initially, the total cancellations were displayed along the selected type, but that made the visualization too "dense" and made the discoveries more difficult to see.

Additionally, initially more airports were displayed and the cancellations were displayed by day. But that made the visualization too bloated and therefore only airports with a certain amount of cancellations (over 2800 cancellations during the year) were displayed and the cancellations were displayed per week.

Additionally, to further filter the data to focus on certain airports, the airports can also be filtered out to make the discovery of trends in certain airports easier.

To aggregate the data, mongodb and it's aggregation pipeline was used. The visualization was done by using javascript and dimple.js. The data was also validated in mongodb, but the dataset was deemed to be very clean with no erronous data.

Feedback:

Resources:
http://stat-computing.org/dataexpo/2009/the-data.html
https://docs.mongodb.org/manual/
https://api.mongodb.org/python/current/
https://github.com/PMSI-AlignAlytics/dimple/wiki
http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends 
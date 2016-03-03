##Summary
The visualization investigates how the cancellations are occuring during different months of a year. It also displays the different reasons for the cancellations (Carrier, Weather, NAS or Security). This visualization helps understand if cancellations types have any correlation with the time of year. The data used is gathered from a span of years 2004 to 2008 to omit yearly outliers from the visualization.

##Design
The original idea of the visualization was to display time series trends in flight cancellations within the scope of a single year. A single year was decided because the size of the single year dataset seemed fitting for the hardware available. Using a larger dataset would have been interesting, however a single years dataset already contained over 11GB of data.

The visualization was decided to be a lineplot with time series in the X-axis and Cancellation amounts in the y-axis, where Cancellation amounts are a quantitative variable and the timeseries are (kind of) a quantitative variable as well. Using a lineplot to visualize time series is a good way to discover time-based trends in the data, therefore using it seemed natural. Additionally, a scatterplot was overlayed on top of the lineplot to make distinctions between months easier. A lineplot was created for each Cancellation type to distinguish the differences between each type better. The Months were initially numerical values, but that was changed to text abbreviations which seem to fit the visualization of Months better. To reduce confusion in the Cancellation types, summaries of the types were added under a togglable button.

Initially, the plot displayed cancellation values for single Airports. As there are quite a few Airports in the US, this design made the visualization initially incredibly crowded, making it impossible to discern any patterns from the visualization. Therefore, the amount of Airports in the visualization was reduced greatly, finally to only 9 airports with the most cancellations during 2008. Additionally, togglable filters were added to the Airport legend in order for the viewer to filter out Airports they did not want to view from the visualization. The time series was initially visualized as days, and that seemed very crowded as well. Therefore weeks was used instead to summarize the time series data a bit better.

Unfortunately, even on a weekly level, trends were very difficult to discover. There seemed to be some spikes on certain weeks while on most weeks the cancellation amount seemed quite constant.

Since the time series line plot was too crowded and did not tell a very clear story, the visualization was redesigned to summarize the initial question better: How do cancellations occur in a set a Airport in year 2008.

To this end, the visualization was changed into a summarizing barplot, which had Cancellation amounts in the Y-axis and Airports in the X-axis. The barplot was stacked by the Cancellation types to summarize the different reason codes. Finally, the plot can be filtered by month in order to display some temporal patterns. A monthly scale for the time series seemed like a scale where you could see some temporal patterns, therefore it seemed like a natural feature to add to the plot.

The scales, ordering and colors were designed to be static in order to make it easier to view changes between the different months in the visualization. An exception to this is that the scale of the Total cancellations had to be increased significantly compared to others as the values were just that much higher. Since the Cancellation reasons seemed confusing, a tooltip-like information panel was added to describe what these cancellation codes mean in detail. The descriptions were quoted from http://www.rita.dot.gov/bts/help/aviation/html/understanding.html.

Finally, the coloring of the plot were considered to be made color-blind friendly, but that ended up to be a bit too much for my knowledge on color-blindedness in general. It was hence deemed to be out of scope.

Due to feedback it was realized that the visualization still was too exploratory, it visualized multiple patterns and it was difficult distinguish a main takeaway from the plot. Therefore the plot needed to focus more on a single pattern and focus on explaining that story. This required a further reduction in the dimensions of the plot to focus on a single, easy-to-distinguish pattern. Therefore the plot was further re-designed to only focus on patterns between time (months of the year) and types of Cancellations. Therefore, the single Airports were basically omitted from the plot. This way, it seems far easier to distinguish temporal patterns in the visualization.

The visualization was then changed to display percentages of cancelled flights, because simple amounts did not quite describe the patterns that are being described in the visualization. The ratios will make it easier to distinguish whether the cancellation ratios are truly meaningful instead of just high due to there just being significantly more flights at certain times of the year.

Additionally, since the patterns in the visualization were quite unclear, it was decided that the dataset needed to be drastically larger. Therefore, instead of just viewing data from year 2008, data from years 2004-2008 are visualized instead.

The previous designs are in previous/- and previous-060216/-folders of the project directory.

##Feedback

*1st feedback:*
- I think the first thing I notice is that there are several particularly tall peaks in the visualisation, but most seems to be somewhat lower-level delays. It's hard to pick out a pattern, just that there are certain times when there were a lot delays at certain airports.
- I don't really understand the scale you've used on the vertical axis. Whilst something in the order of thousands makes sense for a number of delayed flights, I don't understand what it is in terms of a ratio.
- I'm not sure what the main takeaway is - I think this is the main thing you still need to work on for this visualisation. This is quite an exploratory/explorable visualisation, but I really want to know - what is the main finding or result or trend that you've discovered that you're trying to share?
-  don't really understand the plot for 'Security Cancellations' - it looks like everything is 0.

*2nd feedback:*
- Because there are many series in one plot, it is a bit hard to read them. I think it would be interesting to summarize the data somehow.
- Y-axis is the ratio of flights from all flights, but the number is close to 1k. I couldn’t understand the meaning of y-axis.

*Answers for 1st and 2nd feedback (as they overlapped):*
- The visualization was redesigned to summarize the initial questions better (and hopefully provide a clearer answer). The barplot-based summarization visualization should make it easier to pick out patterns in the data.
- The label on the Y-axis scale incorrectly indicated ratios, when the quantities were clearly amounts. This was from when I experimented with ratios and forgot to change the label afterwards.
- Hopefully the redesign makes the main takeaway of the visualization clearer. The main takeaway should be the effect on how time and cancellation reasons affect different airports cancellation amounts.
- The displaying of Security Cancellations may seem counterintuitive as it doesn't really have data (2 cancellation the entire year for the sample Airports, I think), but I feel it indicated an important pattern: There really are not that many Cancellations caused by Security issues.

*3rd feedback:*
- I noticed that when I change the month, the order of reasons is getting changed, and that makes it hard to compare how the proportion of them did change between months per airport.
- As I wrote in the previous comment, I do not know the meaning of NAS, it would be helpful to provide information about that.
- As I am colorblind, I find it difficult to differentiate the color of Carrier and Security.
- I think the reverse order of the legends is also distracting.

*Answers for 3rd feedback:*
- Made the plot sorted by Cancellation reasons. Should make comparisons between months easier.
- Added description tooltip for the Cancellation reasons, they were quite unclear even to me.
- Colorblind-friendly visuals was something I ended up not doing, mostly due to my lack of knowledge in how to design visuals that are distinguishable to all forms of color-blindedness.
- I thought the legend ordering was correct, therefore I maintained this as more a matter of opinion than anything else. Additionally, this ended up to be a bit difficult to fix as the sorting of data seemed to affect both the plot and the legend.

*4th feedback:*
- This is a great exploratory chart, but I don't really see an explanatory story yet. There seemed to be many relationships and stories displayed on the plot and that made it difficult for the viewer to have a main takeaway from the plot. The readers attention is not focused on a single finding which should be the cornerstone of a good explanatory visualization.

*Answers for 4th feedback:*
- The plot was further re-designed to really focus on being explanatory and tell the story of a single pattern in the data. Patterns between time (months) and cancellation types was decided as primary pattern being shown. The visual encodings were also changed significantly to adjust.


##Resources
- http://stat-computing.org/dataexpo/2009/the-data.html
- https://docs.mongodb.org/manual/
- https://api.mongodb.org/python/current/
- https://github.com/PMSI-AlignAlytics/dimple/wiki
- http://dimplejs.org/advanced_examples_viewer.html?id=advanced_interactive_legends 
- http://www.rita.dot.gov/bts/help/aviation/html/understanding.html

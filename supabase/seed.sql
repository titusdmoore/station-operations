INSERT INTO public.agencies VALUES
(1,'2023-08-02 12:55:58.155872+00','Franklin Township Fire Department','FTSO19');

INSERT INTO public.roster VALUES
(1,'2023-08-01 19:08:54.429236+00','Seth Adams','sadams@ftfd.org','Lieutenant','true',null),
(3,'2023-08-02 17:28:53.031609+00','Ben Steward','bsteward@ftfd.org','Lieutenant','false',null),
(4,'2023-08-02 18:49:53.912775+00','Damon Tipton','dtipton@ftfd.org','Lieutenant','true',null),
(2,'2023-08-02 15:43:09.846142+00','Titus Moore','tmoore@ftfd.org','Firefighter','false',null);


INSERT INTO public.reports VALUES
(2,'2023-08-02 15:19:11.219466+00','Titus','Moore','conduct-unbecoming','At a public event with the City of Franklin Division of Fire Seth went to a Company Officer of their department who also worked at FTFD and stated that the company officer doesn’t have any power over him at the township, since he only has bugles at the city. Seth gestured to the uniform of the other stating that the name tag does not say Lt. at the township, it says FF. This occurred prior to the official announcement of the promotions at FTFD. This was a result of the company officer at the city congratulating Seth.',1);


INSERT INTO public.reportIssueTypes VALUES
(1,'2023-08-02 15:23:51.638088+00','Conduct Unbecoming','conduct-unbecoming'),
(2,'2023-08-02 15:24:19.824673+00','Gross Negligence','gross-negligence'),
(3,'2023-08-02 17:53:47.909056+00','General Violation','general-violation');

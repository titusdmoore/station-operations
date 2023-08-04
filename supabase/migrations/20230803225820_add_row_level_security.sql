CREATE POLICY "Enable read access for authenticated users."
ON public.reportIssueTypes
AS PERMISSIVE FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable read access for authenticated users."
ON public.roster
AS PERMISSIVE FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert access for authenticated users."
ON public.reports
FOR INSERT 
TO authenticated 
WITH CHECK (true);

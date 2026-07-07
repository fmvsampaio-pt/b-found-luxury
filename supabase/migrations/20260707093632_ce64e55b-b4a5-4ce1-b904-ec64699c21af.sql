-- Lock down has_role: only used inside policies; not exposed to API callers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Replace overly permissive INSERT policy with validated one
DROP POLICY IF EXISTS "Anyone can submit a planning request" ON public.planning_submissions;

CREATE POLICY "Anyone can submit a planning request"
ON public.planning_submissions
FOR INSERT
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND project_type IS NOT NULL AND length(project_type) BETWEEN 1 AND 100
  AND budget_range IS NOT NULL AND length(budget_range) BETWEEN 1 AND 100
  AND timeline IS NOT NULL AND length(timeline) BETWEEN 1 AND 100
  AND (name IS NULL OR length(name) <= 200)
  AND (notes IS NULL OR length(notes) <= 5000)
  AND coalesce(array_length(rooms, 1), 0) <= 50
  AND coalesce(array_length(systems, 1), 0) <= 50
);
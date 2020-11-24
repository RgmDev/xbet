/*
    % de empates por division/season/journey
*/
select division, season, journey, result, count(*) con
from results 
group by division, result, season, journey
order by division, season, journey


/*
    % de empates por equipo/division/season/journey
*/
select t.team, t.division, t.season, t.journey, t.result, t.local_team
from (
	select t.*, r.*, if(t.team = local, true, false) as local_team 
	from teams t
	left join results r on (t.team = r.local or t.team = r.visiting)
	order by division, season, journey, id
) t
order by t.team, t.division, t.season, t.journey, t.result, t.local_team

/*
    Rachas de empates
*/
select 
	t.team,
    t.division, 
    t.season, 
    t.journey,
    t.diff
from (
	select 
		t.*, 
		if(@team <> team, @diff := 0, ''),
		journey - (@diff) as diff,
		@diff, 
		@diff := journey as calc,
		@team,
		
		@team := team
	from (
		select t.*, r.*
		from teams t
		left join results r on (t.team = r.local or t.team = r.visiting)
		where local_goals = visiting_goals
		order by division, season, t.team, journey
	) t
	inner join ( select @diff := 0, @team := '' ) vars
) t
order by 
	t.team,
    t.season, 
    t.journey

/*
    Simulator v1
*/
select t.division, t.season, t.team, sum(bet) from (
select 
	t.team,
    t.division, 
    t.season, 
    t.journey,
    t.diff,
    ifnull(b.bet*3, -(select sum(bet) from bets)) bet
from (
	select 
		t.*, 
		if(@team <> team, @diff := 0, ''),
		journey - (@diff) as diff,
		@diff, 
		@diff := journey as calc,
		@team,
		@team := team
	from (
		select t.*, r.*
		from teams t
		left join results r on (t.team = r.local or t.team = r.visiting)
		where local_goals = visiting_goals
		order by division, season, t.team, journey
	) t
	inner join ( select @diff := 0, @team := '' ) vars
) t
left join bets b on t.diff = b.id
order by 
	t.team,
    t.season, 
    t.journey
) t
group by t.division, t.season, t.team
order by t.division, t.season, t.team
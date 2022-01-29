# Data Models

## PostgreSQL Data

- Account Model
  - start_balance:float
  - start_date:datetime
  - title:string
  - description:string
  - plaid_item:PlaidItem (optional)
  - transactions:Transaction[]
  - value(simulation,scenario,date):float { transactions.reduce() }
- Scenario Model
  - title:string
  - modify_value(float):float
  - TODO
- TransactionTemplate Model
  - title:string
  - description:string
  - source:Account
  - destination:Account
  - amount:float
  - recurrence:string (single|recurring)
  - recurrence_days:int
  - start_date:datetime
  - end_date:datetime
  - priority:int
  - generate_txn(date,scenario,simulation):Transaction

## Redis Data

- Transaction Model
  - account:Account
  - scenario:Scenario
  - simulation:Simulation
  - amount:float
  - date:float
  - description:string
- Simulation Model
  - user:User
  - created_at:datetime
  - stop_date:datetime
  - scenarios:Scenario[]
  - timeline:{scenario:string, date:datetime, account:Account, value:float}[]

# Overview

Wyzplan users will each have a set of Accounts, which represent all the assets and liabilities that will be used by the
application to generate time-series simulations of changes in the value of these Accounts.  Simulations will be created
very frequently in response to changes in a user's data, so for both performance and data storage reasons the Simulation
and it's associated Transactions will utilize Redis memory storage with a relatively short TTL.  For all long-term data
models, such as the user Account lists, a traditional relational PostgreSQL db will be used.

Accounts are created using data initially provided by the user (either manually or via Plaid import).  Account examples
would be 'Checking', '401k', 'Primary Home', or 'Credit Card'.  Accounts will be related to a large number of short-lived Transactions,
each of which is specific to a particular simulation and scenario.  The primary function for Accounts is to return the value
for the account in a given scenario-simulation-date context.

TransactionTemplates represent balance transfers between Accounts, for example 'Salary', 'Mortgage Payment', or 'Fund 529'.
These may be created automatically by some Account model types, or from user input.  These are used by the app to generate
Transactions.

Scenarios represent modifiers to apply to the value used by a TransactionTemplate when creating a Transaction.  These will have
complex inheritance/applicability rules to implement.


## Simulation Generation

Create a new Simulation and then starting at today, loop in a fixed time increment (week, day, month?) and generate a datestamped
value for each account in each scenario.  In pseudocode:

```
sim = new Simulation(scenarios: ['good','bad']);

foreach(step_date in (sim.stop_date - today)):
  foreach(sim.scenarios) |scenario|
    # generate Transactions
    foreach(user.transaction_templates) |template|
      # credit txn
      template.destination.transactions += template.generate_txn(step_date,scenario,simulation)
      # debit txn
      template.source.transactions += (-1 * template.generate_txn(step_date,scenario,simulation))
    end

    # record Account values as of step_date
    foreach(user.accounts) |account|
      sim.timeline += {
        date: step_date,
        scenario: scenario,
        account: account,
        value: account.value(date,scenario,simulation)
      }
    end
  end
end
```

(TODO: estimate operation counts)


## Secondary Data Products

Once a simulation has been fully generated, the data for specific visualizations/reports are all derivative functions of
the pre-computed simulation timeline.  For example, net worth over time would be the sum of every account value per time
unit.


# Plaid Integration

TODO

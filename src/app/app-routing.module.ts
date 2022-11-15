import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   { path: 'login', loadChildren: () => import('./Authentication/login/login.module').then(m => m.LoginModule) },
   { path: 'Global/header', loadChildren: () => import('./Global/header/header.module').then(m => m.HeaderModule) },
   { path: 'dashboard', loadChildren: () => import('./Global/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: '', loadChildren: () => import('./Global/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'Global/menu', loadChildren: () => import('./Global/menu/menu.module').then(m => m.MenuModule) },
   { path: 'AccountMapping', loadChildren: () => import('./Features/Accounting/AccountMapping/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
   { path: 'balancesheet', loadChildren: () => import('./Features/Accounting/BalanceSheet/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'financialsummary', loadChildren: () => import('./Features/Accounting/FinancialSummary/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
   { path: 'floorplans', loadChildren: () => import('./Features/Accounting/FloorplanReconciliation/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'adminmodules', loadChildren: () => import('./Features/Admin/admin-modules/admin-modules.module').then(m => m.AdminModulesModule) },
   { path: 'jobroles', loadChildren: () => import('./Features/Admin/job-roles/job-roles.module').then(m => m.JobRolesModule) },
   { path: 'jobititles', loadChildren: () => import('./Features/Admin/job-titles/job-titles.module').then(m => m.JobTitlesModule) },
   { path: 'permissions', loadChildren: () => import('./Features/Admin/permissions/permissions.module').then(m => m.PermissionsModule) },
   { path: 'adminroles', loadChildren: () => import('./Features/Admin/roles/roles.module').then(m => m.RolesModule) },
   { path: 'users', loadChildren: () => import('./Features/Admin/users/users.module').then(m => m.UsersModule) },
   { path: 'stores', loadChildren: () => import('./Features/Admin/stores/stores.module').then(m => m.StoresModule) },
   { path: 'SalesGross', loadChildren: () => import('./Features/Sales/SalesGross/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'salesconversion', loadChildren: () => import('./Features/Sales/SalesConversion/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
   { path: 'salesreconciliation', loadChildren: () => import('./Features/Sales/SalesReconciliation/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'Inventory', loadChildren: () => import('./Features/Sales/Inventory/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'ServiceGross', loadChildren: () => import('./Features/ServiceBodyShop/ServiceGross/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'servicereconciliation', loadChildren: () => import('./Features/ServiceBodyShop/ServiceReconciliation/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'PartsGross', loadChildren: () => import('./Features/Parts/PartsGross/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'partsreconciliation', loadChildren: () => import('./Features/Parts/PartsReconciliation/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'schedules', loadChildren: () => import('./Features/Accounting/Schedules/dashboard/dashboard.module').then(m => m.DashboardModule) },
   { path: 'NightlyReportSales', loadChildren: () => import('./Features/Sales/NightlySalesSummary/dashboard/dashboard.module').then(m => m.DashboardModule) },

   { path: 'Features/Sales/NightlySalesSummary/nightlysales-report', loadChildren: () => import('./Features/Sales/NightlySalesSummary/nightlysales-report/nightlysales-report.module').then(m => m.NightlysalesReportModule) },
   { path: 'Features/Sales/NightlySalesSummary/nightlysales-deals', loadChildren: () => import('./Features/Sales/NightlySalesSummary/nightlysales-deals/nightlysales-deals.module').then(m => m.NightlysalesDealsModule) },

   { path: 'Features/Accounting/BalanceSheet/bs-report', loadChildren: () => import('./Features/Accounting/BalanceSheet/bs-reports/bs-reports.module').then(m => m.BsReportsModule) },
   { path: 'Features/Accounting/FinancialSummary/fs-reports', loadChildren: () => import('./Features/Accounting/FinancialSummary/fs-reports/fs-reports.module').then(m => m.FsReportsModule) },
   { path: 'Features/Accounting/FinancialSummary/fs-details', loadChildren: () => import('./Features/Accounting/FinancialSummary/fs-details/fs-details.module').then(m => m.FsDetailsModule) },
 
   { path: 'Features/Accounting/FloorplanReconciliation/cit-reports', loadChildren: () => import('./Features/Accounting/FloorplanReconciliation/cit-reports/cit-reports.module').then(m => m.CitReportsModule) },
   { path: 'Features/Accounting/FloorplanReconciliation/cit-analyse', loadChildren: () => import('./Features/Accounting/FloorplanReconciliation/cit-analyse/cit-analyse.module').then(m => m.CitAnalyseModule) },

   { path: 'Features/Sales/SalesGross/salesgross-reports', loadChildren: () => import('./Features/Sales/SalesGross/salesgross-reports/salesgross-reports.module').then(m => m.SalesgrossReportsModule) },
   { path: 'Features/Sales/SalesGross/salesgross-details', loadChildren: () => import('./Features/Sales/SalesGross/salesgross-details/salesgross-details.module').then(m => m.SalesgrossDetailsModule) },

   { path: 'Features/Sales/SalesConversion/sc-reports', loadChildren: () => import('./Features/Sales/SalesConversion/sc-reports/sc-reports.module').then(m => m.ScReportsModule) },
   { path: 'Features/Sales/SalesConversion/sc-details', loadChildren: () => import('./Features/Sales/SalesConversion/sc-details/sc-details.module').then(m => m.ScDetailsModule) },
   
   { path: 'Features/ServiceBodyShop/ServiceGross/servicegross-reports', loadChildren: () => import('./Features/ServiceBodyShop/ServiceGross/servicegross-reports/servicegross-reports.module').then(m => m.ServicegrossReportsModule) },
   { path: 'Features/ServiceBodyShop/ServiceGross/servicegross-details', loadChildren: () => import('./Features/ServiceBodyShop/ServiceGross/servicegross-details/servicegross-details.module').then(m => m.ServicegrossDetailsModule) },

   { path: 'Features/Parts/PartsGross/partsgross-details', loadChildren: () => import('./Features/Parts/PartsGross/partsgross-details/partsgross-details.module').then(m => m.PartsgrossDetailsModule) },
   { path: 'Features/Parts/PartsGross/partsgross-reports', loadChildren: () => import('./Features/Parts/PartsGross/partsgross-reports/partsgross-reports.module').then(m => m.PartsgrossReportsModule) },

   { path: 'Features/Accounting/Schedules/schedule-reports', loadChildren: () => import('./Features/Accounting/Schedules/schedule-reports/schedule-reports.module').then(m => m.ScheduleReportsModule) },
   { path: 'Features/Accounting/Schedules/schedules-transactions', loadChildren: () => import('./Features/Accounting/Schedules/schedules-transactions/schedules-transactions.module').then(m => m.SchedulesTransactionsModule) },
   { path: 'LoyalityComparison', loadChildren: () => import('./Features/Accounting/loyality-comparison/loyality-comparison.module').then(m => m.LoyalityComparisonModule) },

   { path: '**', loadChildren: () => import('./Global/dashboard/dashboard.module').then(m => m.DashboardModule) }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

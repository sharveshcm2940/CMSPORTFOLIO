import React, { useState } from 'react';
import {
  Check,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowUpRight,
} from 'lucide-react';

/* ============================================================================
   01. ALS INFONET CRM / DEAL FLOW 360 WORKSPACE
   Faithful to github.com/sharveshcm2940/ALS-CRM
   ============================================================================ */

interface AlsTask {
  id: string;
  name: string;
  project_name: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Completed' | 'Review';
  progress: number;
  dueDate: string;
  description: string;
}

interface AlsLead {
  id: string;
  company: string;
  contact: string;
  owner: string;
  stage: 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won';
  value: number;
  updatedAt: string;
}

const INITIAL_ALS_TASKS: AlsTask[] = [
  {
    id: 'TSK-104',
    name: 'Verify MySQL 8.4 session rotation and bcrypt cost factor 12 on production container',
    project_name: 'ALS Core Auth',
    assignee: 'Sharvesh CM',
    priority: 'High',
    status: 'In Progress',
    progress: 75,
    dueDate: '28 Oct 2026',
    description:
      'Ensure opaque database-backed cookie sessions revoke cleanly on password reset and verify 127.0.0.1:3307 container binding.',
  },
  {
    id: 'TSK-108',
    name: 'Configure role-based permission guards for Board and Engineering accounts',
    project_name: 'Internal RBAC',
    assignee: 'Siddharth',
    priority: 'High',
    status: 'Review',
    progress: 90,
    dueDate: '26 Oct 2026',
    description:
      'Audit read/write scopes across leads, projects, and team endpoints for the nine seeded organization accounts.',
  },
  {
    id: 'TSK-112',
    name: 'Build monthly executive workload aggregation query for Reports view',
    project_name: 'Analytics Module',
    assignee: 'Sarveshvaran A',
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    dueDate: '21 Oct 2026',
    description:
      'Aggregate completed vs. active engineering tasks per team member with zero N+1 query overhead.',
  },
  {
    id: 'TSK-115',
    name: 'Implement inline lead stage transitions and audit log persistence',
    project_name: 'Deal Flow 360',
    assignee: 'Lohith',
    priority: 'Medium',
    status: 'In Progress',
    progress: 50,
    dueDate: '02 Nov 2026',
    description:
      'Record timestamped stage transitions whenever a B2B account moves from Proposal to Negotiation.',
  },
];

const INITIAL_ALS_LEADS: AlsLead[] = [
  {
    id: 'LD-401',
    company: 'Vanguard Logistics Pvt Ltd',
    contact: 'R. Subramanian',
    owner: 'Sharvesh CM',
    stage: 'Negotiation',
    value: 480000,
    updatedAt: '2h ago',
  },
  {
    id: 'LD-402',
    company: 'Meridian Industrial Supply',
    contact: 'K. Natarajan',
    owner: 'Siddharth',
    stage: 'Proposal',
    value: 320000,
    updatedAt: '5h ago',
  },
  {
    id: 'LD-403',
    company: 'Coromandel Freight Systems',
    contact: 'A. Jayaraman',
    owner: 'Sarveshvaran A',
    stage: 'Closed Won',
    value: 650000,
    updatedAt: 'Yesterday',
  },
  {
    id: 'LD-404',
    company: 'Apex Precision Components',
    contact: 'M. Balaji',
    owner: 'Lohith',
    stage: 'Qualified',
    value: 210000,
    updatedAt: '2d ago',
  },
];

const ALS_TEAM = [
  { name: 'Abdul', username: 'abdul', role: 'Chief Executive Officer', active: 2, completed: 14 },
  { name: 'Aakash', username: 'aakash', role: 'Board member', active: 1, completed: 8 },
  { name: 'Sharvesh CM', username: 'sharvesh.cm', role: 'Engineering team', active: 4, completed: 19 },
  { name: 'Siddharth', username: 'siddharth', role: 'Engineering team', active: 3, completed: 15 },
  { name: 'Sarveshvaran A', username: 'sarveshvaran.a', role: 'Engineering team', active: 2, completed: 16 },
  { name: 'Lohith', username: 'lohith', role: 'Engineering team', active: 3, completed: 12 },
];

export const DealFlow360Dashboard: React.FC = () => {
  const [activeNav, setActiveNav] = useState<'dashboard' | 'leads' | 'tasks' | 'team'>('dashboard');
  const [tasks, setTasks] = useState<AlsTask[]>(INITIAL_ALS_TASKS);
  const [leads, setLeads] = useState<AlsLead[]>(INITIAL_ALS_LEADS);
  const [expandedBriefs, setExpandedBriefs] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('Deal Flow 360');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const isCompleted = t.status === 'Completed';
        return {
          ...t,
          status: isCompleted ? 'In Progress' : 'Completed',
          progress: isCompleted ? 50 : 100,
        };
      })
    );
  };

  const updateLeadStage = (id: string, nextStage: AlsLead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage: nextStage, updatedAt: 'Just now' } : l))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    const created: AlsTask = {
      id: `TSK-${116 + tasks.length}`,
      name: newTaskName.trim(),
      project_name: newTaskProject.trim() || 'Deal Flow 360',
      assignee: 'Sharvesh CM',
      priority: newTaskPriority,
      status: 'In Progress',
      progress: 20,
      dueDate: '10 Nov 2026',
      description: 'Created from workspace quick-entry bar and assigned to engineering queue.',
    };
    setTasks((prev) => [created, ...prev]);
    setNewTaskName('');
    setShowQuickCreate(false);
  };

  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length;
  const openTasksCount = tasks.length - completedTasksCount;
  const pipelineTotal = leads.reduce((sum, l) => sum + l.value, 0);
  const wonTotal = leads
    .filter((l) => l.stage === 'Closed Won')
    .reduce((sum, l) => sum + l.value, 0);

  const filteredTasks = tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border border-[#D5D5D5] bg-[#F8F9FA] text-[#282828] rounded-[8px] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Sidebar matching ALS-CRM Layout.jsx */}
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#E4E4E7] bg-white p-4 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-[#E4E4E7] flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#080808]">
                  ALS Infonet
                </p>
                <p className="text-[11.5px] text-[#888888]">Deal Flow 360 Workspace</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" title="Database connected" />
            </div>

            <nav aria-label="ALS CRM Workspace" className="mt-4 space-y-1">
              {(
                [
                  ['dashboard', 'Dashboard', `${tasks.length}`],
                  ['leads', 'Leads & Pipeline', `${leads.length}`],
                  ['tasks', 'Tasks', `${openTasksCount} open`],
                  ['team', 'Team', `${ALS_TEAM.length}`],
                ] as const
              ).map(([key, label, count]) => {
                const active = activeNav === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveNav(key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-[13px] transition-colors ${
                      active
                        ? 'bg-[#080808] text-white font-medium'
                        : 'text-[#282828] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[11px] tabular-nums ${
                        active ? 'text-white/75' : 'text-[#888888]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:block pt-4 border-t border-[#E4E4E7] text-[12px]">
            <p className="font-medium text-[#080808]">Sharvesh CM</p>
            <p className="text-[11px] text-[#888888]">@sharvesh.cm · Engineering team</p>
          </div>
        </aside>

        {/* Main Workspace Viewport */}
        <div className="lg:col-span-9 flex flex-col justify-between bg-[#F8F9FA]">
          <div>
            {/* Workspace Top Header */}
            <div className="bg-white border-b border-[#E4E4E7] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search records, projects, or assignees..."
                  className="w-full rounded-[6px] border border-[#D5D5D5] bg-white pl-8 pr-3 py-1.5 text-[12.5px] text-[#080808] placeholder:text-[#999999] focus:border-[#080808] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowQuickCreate((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#080808] px-3.5 py-1.5 text-[12.5px] font-medium text-white hover:bg-[#282828] transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Task</span>
                </button>
              </div>
            </div>

            {/* Inline Quick Create Form */}
            {showQuickCreate && (
              <form
                onSubmit={handleAddTask}
                className="bg-white border-b border-[#E4E4E7] px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
              >
                <div className="sm:col-span-5">
                  <label className="block text-[11.5px] font-medium text-[#282828] mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="e.g., Optimize leads pagination query"
                    className="w-full rounded-[6px] border border-[#D5D5D5] bg-white px-3 py-1.5 text-[12.5px] text-[#080808]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11.5px] font-medium text-[#282828] mb-1">
                    Project
                  </label>
                  <input
                    type="text"
                    value={newTaskProject}
                    onChange={(e) => setNewTaskProject(e.target.value)}
                    className="w-full rounded-[6px] border border-[#D5D5D5] bg-white px-3 py-1.5 text-[12.5px] text-[#080808]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11.5px] font-medium text-[#282828] mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) =>
                      setNewTaskPriority(e.target.value as 'High' | 'Medium' | 'Low')
                    }
                    className="w-full rounded-[6px] border border-[#D5D5D5] bg-white px-2.5 py-1.5 text-[12.5px] text-[#080808]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-[6px] bg-[#080808] text-white px-3 py-1.5 text-[12.5px] font-medium hover:bg-[#282828]"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            {/* View Content */}
            <div className="p-5">
              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] p-3.5">
                  <p className="text-[11.5px] text-[#888888]">Active Pipeline</p>
                  <p className="mt-1 text-[18px] font-semibold text-[#080808] tabular-nums">
                    ₹{(pipelineTotal / 100000).toFixed(2)}L
                  </p>
                </div>
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] p-3.5">
                  <p className="text-[11.5px] text-[#888888]">Closed Won</p>
                  <p className="mt-1 text-[18px] font-semibold text-[#15803D] tabular-nums">
                    ₹{(wonTotal / 100000).toFixed(2)}L
                  </p>
                </div>
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] p-3.5">
                  <p className="text-[11.5px] text-[#888888]">Open Tasks</p>
                  <p className="mt-1 text-[18px] font-semibold text-[#080808] tabular-nums">
                    {openTasksCount}
                  </p>
                </div>
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] p-3.5">
                  <p className="text-[11.5px] text-[#888888]">Completed Month</p>
                  <p className="mt-1 text-[18px] font-semibold text-[#1D4ED8] tabular-nums">
                    {completedTasksCount}
                  </p>
                </div>
              </div>

              {(activeNav === 'dashboard' || activeNav === 'tasks') && (
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E4E4E7] flex items-center justify-between">
                    <h4 className="text-[13px] font-semibold text-[#080808]">
                      Engineering & Operations Queue
                    </h4>
                    <span className="text-[11.5px] text-[#888888]">
                      Click checkbox to complete or reopen
                    </span>
                  </div>

                  <div className="divide-y divide-[#E4E4E7]">
                    {filteredTasks.map((task) => {
                      const isCompleted = task.status === 'Completed';
                      const isExpanded = !!expandedBriefs[task.id];
                      return (
                        <div
                          key={task.id}
                          className={`p-4 transition-colors ${
                            isCompleted ? 'bg-[#F8F9FA]' : 'bg-white hover:bg-[#F8F9FA]/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                onClick={() => toggleTaskComplete(task.id)}
                                aria-label={isCompleted ? 'Reopen task' : 'Complete task'}
                                className={`mt-0.5 h-4 w-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                                  isCompleted
                                    ? 'bg-[#15803D] border-[#15803D] text-white'
                                    : 'border-[#D5D5D5] bg-white hover:border-[#080808]'
                                }`}
                              >
                                {isCompleted && <Check className="w-3 h-3" />}
                              </button>

                              <div>
                                <p
                                  className={`text-[13px] font-medium leading-[1.4] ${
                                    isCompleted
                                      ? 'line-through text-[#888888]'
                                      : 'text-[#080808]'
                                  }`}
                                >
                                  {task.name}
                                </p>
                                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-[#888888]">
                                  <span className="text-[#282828] font-medium">
                                    {task.project_name}
                                  </span>
                                  <span>·</span>
                                  <span>{task.assignee}</span>
                                  <span>·</span>
                                  <span className="tabular-nums">Due {task.dueDate}</span>
                                  <span>·</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedBriefs((prev) => ({
                                        ...prev,
                                        [task.id]: !prev[task.id],
                                      }))
                                    }
                                    className="inline-flex items-center gap-0.5 text-[#080808] hover:underline"
                                  >
                                    <span>{isExpanded ? 'Hide brief' : 'Task brief'}</span>
                                    {isExpanded ? (
                                      <ChevronUp className="w-3 h-3" />
                                    ) : (
                                      <ChevronDown className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>

                                {isExpanded && (
                                  <p className="mt-2.5 text-[12px] leading-[1.55] text-[#282828] bg-[#F8F9FA] border border-[#E4E4E7] rounded-[4px] p-2.5">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-[11.5px]">
                              <span
                                className={`font-medium ${
                                  task.priority === 'High'
                                    ? 'text-[#B91C1C]'
                                    : task.priority === 'Medium'
                                    ? 'text-[#B45309]'
                                    : 'text-[#888888]'
                                }`}
                              >
                                {task.priority}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-[4px] border text-[11px] font-medium tabular-nums ${
                                  isCompleted
                                    ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]'
                                    : task.status === 'Review'
                                    ? 'border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]'
                                    : 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]'
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeNav === 'leads' && (
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[12.5px]">
                    <thead>
                      <tr className="border-b border-[#E4E4E7] bg-[#F8F9FA] text-[11.5px] font-medium text-[#888888]">
                        <th className="py-2.5 px-4">Company</th>
                        <th className="py-2.5 px-4">Primary Contact</th>
                        <th className="py-2.5 px-4">Owner</th>
                        <th className="py-2.5 px-4">Stage</th>
                        <th className="py-2.5 px-4 text-right">Deal Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E7]">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#F8F9FA]">
                          <td className="py-3 px-4 font-medium text-[#080808]">
                            {lead.company}
                          </td>
                          <td className="py-3 px-4 text-[#282828]">{lead.contact}</td>
                          <td className="py-3 px-4 text-[#888888]">{lead.owner}</td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.stage}
                              onChange={(e) =>
                                updateLeadStage(
                                  lead.id,
                                  e.target.value as AlsLead['stage']
                                )
                              }
                              className="rounded-[4px] border border-[#D5D5D5] bg-white px-2 py-1 text-[12px] font-medium text-[#080808]"
                            >
                              <option value="Qualified">Qualified</option>
                              <option value="Proposal">Proposal</option>
                              <option value="Negotiation">Negotiation</option>
                              <option value="Closed Won">Closed Won</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-[#080808] tabular-nums">
                            ₹{lead.value.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeNav === 'team' && (
                <div className="bg-white border border-[#E4E4E7] rounded-[6px] overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[12.5px]">
                    <thead>
                      <tr className="border-b border-[#E4E4E7] bg-[#F8F9FA] text-[11.5px] font-medium text-[#888888]">
                        <th className="py-2.5 px-4">Name</th>
                        <th className="py-2.5 px-4">Username</th>
                        <th className="py-2.5 px-4">Role</th>
                        <th className="py-2.5 px-4 text-right">Active</th>
                        <th className="py-2.5 px-4 text-right">Completed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E7]">
                      {ALS_TEAM.map((m) => (
                        <tr key={m.username} className="hover:bg-[#F8F9FA]">
                          <td className="py-2.5 px-4 font-medium text-[#080808]">{m.name}</td>
                          <td className="py-2.5 px-4 text-[#888888]">{m.username}</td>
                          <td className="py-2.5 px-4 text-[#282828]">{m.role}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums font-medium text-[#1D4ED8]">
                            {m.active}
                          </td>
                          <td className="py-2.5 px-4 text-right tabular-nums font-medium text-[#15803D]">
                            {m.completed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Workspace Footer Status */}
          <div className="bg-white border-t border-[#E4E4E7] px-5 py-2.5 flex items-center justify-between text-[11.5px] text-[#888888]">
            <span>ALS Infonet CRM · Express + MySQL 8.4</span>
            <a
              href="https://github.com/sharveshcm2940/ALS-CRM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#080808] font-medium hover:underline"
            >
              <span>View source in ALS-CRM</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   02. LAW CRM — NR ELANGO LAW ASSOCIATES OPERATING SYSTEM
   Faithful to github.com/sharveshcm2940/LAW-CRM
   ============================================================================ */

interface LawCaseItem {
  id: string;
  cnr: string;
  petitioner: string;
  respondent: string;
  forum: string;
  stage: 'Admission' | 'Counter Affidavit' | 'Arguments' | 'Disposed';
  nextDate: string;
  retainerFee: number;
  invoicePaid: boolean;
  notes: string;
}

const INITIAL_LAW_CASES: LawCaseItem[] = [
  {
    id: 'MAT-01',
    cnr: 'TNCH01-014892-2026',
    petitioner: 'Sundaram Infrastructure Pvt Ltd',
    respondent: 'State Highways Department',
    forum: 'Madras High Court · Court Hall 4',
    stage: 'Counter Affidavit',
    nextDate: '29 Oct 2026',
    retainerFee: 85000,
    invoicePaid: false,
    notes: 'Interim stay granted on tender forfeiture. Counter affidavit due from respondent.',
  },
  {
    id: 'MAT-02',
    cnr: 'TNCH04-008321-2026',
    petitioner: 'Kaveri Textiles & Exports',
    respondent: 'Southern Shipping Corp',
    forum: 'Commercial Division · Chennai',
    stage: 'Arguments',
    nextDate: '05 Nov 2026',
    retainerFee: 120000,
    invoicePaid: true,
    notes: 'Arbitration Section 9 petition. Documentary evidence marked as Exhibits P1–P14.',
  },
  {
    id: 'MAT-03',
    cnr: 'TNCH02-019402-2026',
    petitioner: 'R. Venkataraman',
    respondent: 'CMDA & Tahsildar Guindy',
    forum: 'Madras High Court · Writ Roster',
    stage: 'Admission',
    nextDate: '12 Nov 2026',
    retainerFee: 45000,
    invoicePaid: false,
    notes: 'Writ of Mandamus filed challenging patta transfer delay.',
  },
  {
    id: 'MAT-04',
    cnr: 'TNCH01-003910-2025',
    petitioner: 'Coromandel Logistics',
    respondent: 'National Insurance Co.',
    forum: 'City Civil Court · VII Assistant',
    stage: 'Disposed',
    nextDate: 'Decreed',
    retainerFee: 60000,
    invoicePaid: true,
    notes: 'Settlement memo recorded and decree passed in favor of petitioner.',
  },
];

export const LawCrmDashboard: React.FC = () => {
  const [cases, setCases] = useState<LawCaseItem[]>(INITIAL_LAW_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('MAT-01');
  const [activeTab, setActiveTab] = useState<'matters' | 'billing'>('matters');
  const [showNewMatter, setShowNewMatter] = useState(false);
  const [petitioner, setPetitioner] = useState('');
  const [respondent, setRespondent] = useState('');

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleStageChange = (id: string, stage: LawCaseItem['stage']) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)));
  };

  const toggleInvoicePaid = (id: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, invoicePaid: !c.invoicePaid } : c))
    );
  };

  const handleCreateMatter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petitioner.trim() || !respondent.trim()) return;
    const newId = `MAT-0${cases.length + 1}`;
    const created: LawCaseItem = {
      id: newId,
      cnr: `TNCH01-0249${10 + cases.length}-2026`,
      petitioner: petitioner.trim(),
      respondent: respondent.trim(),
      forum: 'Madras High Court · Writ Roster',
      stage: 'Admission',
      nextDate: '18 Nov 2026',
      retainerFee: 55000,
      invoicePaid: false,
      notes: 'Fresh filing registered via firm intake desk. Vakalatnama executed.',
    };
    setCases((prev) => [created, ...prev]);
    setSelectedCaseId(newId);
    setPetitioner('');
    setRespondent('');
    setShowNewMatter(false);
  };

  const activeCount = cases.filter((c) => c.stage !== 'Disposed').length;
  const pendingBilling = cases
    .filter((c) => !c.invoicePaid)
    .reduce((sum, c) => sum + c.retainerFee, 0);

  return (
    <div className="border border-[#D5D5D5] bg-white text-[#18181B] rounded-[8px] overflow-hidden">
      {/* Top Bar */}
      <div className="border-b border-[#E4E4E7] bg-[#FAFAFA] px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#09090B]">
              NR Elango Law Associates
            </span>
            <span className="text-[#D4D4D8]">/</span>
            <span className="text-[12.5px] text-[#71717A]">
              Case Intelligence & Cause List Workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('matters')}
            className={`px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium transition-colors ${
              activeTab === 'matters'
                ? 'bg-[#18181B] text-white'
                : 'text-[#52525B] hover:bg-[#F4F4F5]'
            }`}
          >
            Matters & Cause List ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className={`px-3 py-1.5 rounded-[6px] text-[12.5px] font-medium transition-colors ${
              activeTab === 'billing'
                ? 'bg-[#18181B] text-white'
                : 'text-[#52525B] hover:bg-[#F4F4F5]'
            }`}
          >
            GST Invoicing (₹{(pendingBilling / 1000).toFixed(0)}k due)
          </button>
          <button
            type="button"
            onClick={() => setShowNewMatter((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-[6px] border border-[#18181B] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#18181B] hover:bg-[#F4F4F5] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>File Matter</span>
          </button>
        </div>
      </div>

      {showNewMatter && (
        <form
          onSubmit={handleCreateMatter}
          className="border-b border-[#E4E4E7] bg-[#F8FAFC] px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
        >
          <div className="sm:col-span-5">
            <label className="block text-[11.5px] font-medium text-[#3F3F46] mb-1">
              Petitioner / Client Name
            </label>
            <input
              type="text"
              required
              value={petitioner}
              onChange={(e) => setPetitioner(e.target.value)}
              placeholder="e.g., Chennai Metro Logistics Ltd"
              className="w-full rounded-[6px] border border-[#D4D4D8] bg-white px-3 py-1.5 text-[12.5px]"
            />
          </div>
          <div className="sm:col-span-5">
            <label className="block text-[11.5px] font-medium text-[#3F3F46] mb-1">
              Respondent
            </label>
            <input
              type="text"
              required
              value={respondent}
              onChange={(e) => setRespondent(e.target.value)}
              placeholder="e.g., Commissioner of Commercial Taxes"
              className="w-full rounded-[6px] border border-[#D4D4D8] bg-white px-3 py-1.5 text-[12.5px]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-[6px] bg-[#18181B] text-white px-3 py-1.5 text-[12.5px] font-medium hover:bg-[#27272A]"
            >
              Add to Docket
            </button>
          </div>
        </form>
      )}

      {activeTab === 'matters' ? (
        /* Master-Detail Split Layout: Left Docket Table + Right Case Dossier Inspector */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E4E4E7]">
          <div className="lg:col-span-7 divide-y divide-[#E4E4E7]">
            {cases.map((c) => {
              const isSelected = c.id === selectedCase.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-4 transition-colors flex items-start justify-between gap-4 ${
                    isSelected ? 'bg-[#F4F4F5]/80' : 'bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11.5px] text-[#71717A] tabular-nums">
                      <span className="font-medium text-[#18181B]">{c.cnr}</span>
                      <span>·</span>
                      <span>{c.forum}</span>
                    </div>
                    <p className="mt-1 text-[13.5px] font-semibold text-[#09090B]">
                      {c.petitioner} <span className="font-normal text-[#71717A]">vs.</span>{' '}
                      {c.respondent}
                    </p>
                    <p className="mt-1 text-[12px] text-[#71717A] tabular-nums">
                      Next Listing: <span className="text-[#18181B] font-medium">{c.nextDate}</span>
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-[4px] border text-[11px] font-medium shrink-0 ${
                      c.stage === 'Disposed'
                        ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]'
                        : c.stage === 'Arguments'
                        ? 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]'
                        : 'border-[#E4E4E7] bg-white text-[#18181B]'
                    }`}
                  >
                    {c.stage}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Case Dossier Inspector */}
          <div className="lg:col-span-5 p-5 bg-[#FAFAFA]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
                <span className="text-[11.5px] font-medium text-[#71717A]">
                  Selected Dossier · {selectedCase.cnr}
                </span>
                <span
                  className={`text-[11.5px] font-medium ${
                    selectedCase.invoicePaid ? 'text-[#15803D]' : 'text-[#B45309]'
                  }`}
                >
                  {selectedCase.invoicePaid ? 'Retainer Settled' : 'Invoice Pending'}
                </span>
              </div>

              <h4 className="mt-3.5 text-[15px] font-semibold text-[#09090B] leading-[1.35]">
                {selectedCase.petitioner} vs. {selectedCase.respondent}
              </h4>
              <p className="mt-1 text-[12.5px] text-[#52525B]">{selectedCase.forum}</p>

              <div className="mt-4">
                <label className="block text-[11.5px] font-medium text-[#52525B] mb-1.5">
                  Update Proceeding Stage
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(
                    ['Admission', 'Counter Affidavit', 'Arguments', 'Disposed'] as const
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStageChange(selectedCase.id, st)}
                      className={`px-2.5 py-1.5 rounded-[5px] text-[12px] font-medium border text-left transition-colors ${
                        selectedCase.stage === st
                          ? 'border-[#18181B] bg-[#18181B] text-white'
                          : 'border-[#E4E4E7] bg-white text-[#3F3F46] hover:bg-[#F4F4F5]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E4E4E7]">
                <p className="text-[11.5px] font-medium text-[#52525B]">Docket Proceedings Note</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.6] text-[#27272A] bg-white border border-[#E4E4E7] rounded-[6px] p-3">
                  {selectedCase.notes}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E4E4E7] flex items-center justify-between text-[12px]">
              <span className="text-[#71717A] tabular-nums">
                Fee: ₹{selectedCase.retainerFee.toLocaleString('en-IN')}
              </span>
              <button
                type="button"
                onClick={() => toggleInvoicePaid(selectedCase.id)}
                className="text-[#09090B] font-medium hover:underline"
              >
                {selectedCase.invoicePaid ? 'Mark as unpaid' : 'Mark invoice paid →'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Billing & GST View */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[11.5px] font-medium text-[#71717A]">
                <th className="py-2.5 px-5">CNR / Matter</th>
                <th className="py-2.5 px-5">Client</th>
                <th className="py-2.5 px-5 text-right">Retainer (INR)</th>
                <th className="py-2.5 px-5">Status</th>
                <th className="py-2.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAFAFA]">
                  <td className="py-3 px-5 font-medium text-[#09090B] tabular-nums">{c.cnr}</td>
                  <td className="py-3 px-5 text-[#3F3F46]">{c.petitioner}</td>
                  <td className="py-3 px-5 text-right font-medium tabular-nums">
                    ₹{c.retainerFee.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`text-[11.5px] font-medium ${
                        c.invoicePaid ? 'text-[#15803D]' : 'text-[#B45309]'
                      }`}
                    >
                      {c.invoicePaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleInvoicePaid(c.id)}
                      className="text-[12px] font-medium text-[#09090B] hover:underline"
                    >
                      {c.invoicePaid ? 'Reopen' : 'Record Receipt'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   03. SCHOLARHIVE — ACADEMIC NOTES REPOSITORY (Flask + SQLite)
   Faithful to github.com/sharveshcm2940/ScholarHive
   ============================================================================ */

interface ScholarNote {
  id: string;
  code: string;
  subject: string;
  title: string;
  semester: string;
  contributor: string;
  uploadedAt: string;
  downloads: number;
  summary: string;
}

const INITIAL_SCHOLAR_NOTES: ScholarNote[] = [
  {
    id: 'N-01',
    code: 'CS3491',
    subject: 'Machine Learning',
    title: 'Supervised Learning, Gradient Descent & Multilayer Perceptrons',
    semester: 'Semester V',
    contributor: 'Sharvesh CM',
    uploadedAt: '14 Oct 2026',
    downloads: 142,
    summary:
      'Covers linear regression, logistic classification, backpropagation derivations, and PyTorch tensor implementation notes.',
  },
  {
    id: 'N-02',
    code: 'CS3492',
    subject: 'Database Management Systems',
    title: 'Relational Schema Design, Normal Forms (1NF–BCNF) & B+ Tree Indexing',
    semester: 'Semester IV',
    contributor: 'Sharvesh CM',
    uploadedAt: '02 Oct 2026',
    downloads: 118,
    summary:
      'Complete SQL query optimization examples, transaction ACID properties, and serializability conflict graphs.',
  },
  {
    id: 'N-03',
    code: 'CS3452',
    subject: 'Operating Systems',
    title: 'Process Synchronization, Deadlock Avoidance & Demand Paging',
    semester: 'Semester IV',
    contributor: 'Karthik V.',
    uploadedAt: '19 Sep 2026',
    downloads: 96,
    summary:
      'Includes Banker algorithm walkthroughs, semaphore mutex patterns, and page replacement policy comparisons.',
  },
  {
    id: 'N-04',
    code: 'CS3591',
    subject: 'Computer Networks',
    title: 'TCP Congestion Control, OSPF Link-State Routing & Socket APIs',
    semester: 'Semester V',
    contributor: 'Ananya R.',
    uploadedAt: '28 Sep 2026',
    downloads: 89,
    summary:
      'Detailed packet header diagrams, subnetting exercises, and Python socket programming examples.',
  },
];

export const ScholarHiveDashboard: React.FC = () => {
  const [notes, setNotes] = useState<ScholarNote[]>(INITIAL_SCHOLAR_NOTES);
  const [activeSubject, setActiveSubject] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Machine Learning');

  const subjects = [
    'All',
    'Machine Learning',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
  ];

  const triggerDownload = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, downloads: n.downloads + 1 } : n))
    );
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: ScholarNote = {
      id: `N-0${notes.length + 1}`,
      code: 'CS3501',
      subject: newSubject,
      title: newTitle.trim(),
      semester: 'Semester V',
      contributor: 'Sharvesh CM',
      uploadedAt: 'Just now',
      downloads: 1,
      summary: 'Uploaded to SQLite repository via Flask multipart form handler.',
    };
    setNotes((prev) => [item, ...prev]);
    setNewTitle('');
    setShowUpload(false);
  };

  const visibleNotes = notes.filter((n) => {
    const matchesSubject = activeSubject === 'All' || n.subject === activeSubject;
    const matchesQuery =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.code.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="border border-[#D5D5D5] bg-white text-[#18181B] rounded-[8px] overflow-hidden">
      <div className="border-b border-[#E4E4E7] bg-[#FAFAFA] px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-semibold text-[#09090B]">ScholarHive</span>
          <span className="text-[#D4D4D8]">/</span>
          <span className="text-[12.5px] text-[#71717A]">
            SVCE Academic Notes Index (Flask · SQLite)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by course code or topic..."
              className="w-full rounded-[6px] border border-[#D4D4D8] bg-white pl-8 pr-3 py-1 text-[12px] focus:border-[#09090B] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowUpload((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-[6px] bg-[#09090B] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#27272A]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Note</span>
          </button>
        </div>
      </div>

      {showUpload && (
        <form
          onSubmit={handleUpload}
          className="border-b border-[#E4E4E7] bg-[#F8FAFC] px-5 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
        >
          <div className="sm:col-span-6">
            <label className="block text-[11.5px] font-medium text-[#3F3F46] mb-1">
              Document Title
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Unit IV — Ensemble Learning & Random Forests"
              className="w-full rounded-[6px] border border-[#D4D4D8] bg-white px-3 py-1.5 text-[12.5px]"
            />
          </div>
          <div className="sm:col-span-4">
            <label className="block text-[11.5px] font-medium text-[#3F3F46] mb-1">
              Subject
            </label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full rounded-[6px] border border-[#D4D4D8] bg-white px-2.5 py-1.5 text-[12.5px]"
            >
              <option value="Machine Learning">Machine Learning</option>
              <option value="Database Management Systems">Database Management Systems</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Computer Networks">Computer Networks</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-[6px] bg-[#09090B] text-white px-3 py-1.5 text-[12.5px] font-medium"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* Subject Filter Strip */}
      <div className="px-5 py-2.5 border-b border-[#E4E4E7] flex flex-wrap items-center gap-1.5 bg-white">
        {subjects.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setActiveSubject(sub)}
            className={`px-2.5 py-1 rounded-[5px] text-[12px] font-medium transition-colors ${
              activeSubject === sub
                ? 'bg-[#18181B] text-white'
                : 'text-[#52525B] hover:bg-[#F4F4F5]'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Table Index */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[12.5px]">
          <thead>
            <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[11.5px] font-medium text-[#71717A]">
              <th className="py-2.5 px-5">Course</th>
              <th className="py-2.5 px-5">Material & Syllabus Scope</th>
              <th className="py-2.5 px-5">Contributor</th>
              <th className="py-2.5 px-5 text-right">Downloads</th>
              <th className="py-2.5 px-5 text-right">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E4E7]">
            {visibleNotes.map((n) => (
              <tr key={n.id} className="hover:bg-[#FAFAFA]">
                <td className="py-3.5 px-5 align-top whitespace-nowrap">
                  <span className="font-semibold text-[#09090B]">{n.code}</span>
                  <span className="block text-[11px] text-[#71717A]">{n.semester}</span>
                </td>
                <td className="py-3.5 px-5 align-top max-w-md">
                  <p className="font-medium text-[#09090B]">{n.title}</p>
                  <p className="text-[11.5px] text-[#71717A] mt-0.5 leading-[1.5]">
                    {n.summary}
                  </p>
                </td>
                <td className="py-3.5 px-5 align-top whitespace-nowrap text-[#3F3F46]">
                  {n.contributor}
                  <span className="block text-[11px] text-[#71717A]">{n.uploadedAt}</span>
                </td>
                <td className="py-3.5 px-5 align-top text-right tabular-nums font-medium text-[#09090B]">
                  {n.downloads}
                </td>
                <td className="py-3.5 px-5 align-top text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => triggerDownload(n.id)}
                    className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#D4D4D8] bg-white px-2.5 py-1 text-[12px] font-medium text-[#09090B] hover:border-[#09090B] transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
   04. APARTMENT MANAGEMENT SYSTEM — RESIDENT & MAINTENANCE LEDGER
   Faithful to github.com/sharveshcm2940/Apartment-management
   ============================================================================ */

interface UnitTicket {
  id: string;
  unit: string;
  resident: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

const INITIAL_UNIT_TICKETS: UnitTicket[] = [
  {
    id: 'REQ-402',
    unit: 'Block A · 402',
    resident: 'R. Narayanan',
    category: 'Electrical',
    description: 'Three-phase distribution breaker trip in kitchen circuit',
    status: 'In Progress',
  },
  {
    id: 'REQ-210',
    unit: 'Block B · 210',
    resident: 'Priya Menon',
    category: 'Plumbing',
    description: 'Main pressure valve replacement requested',
    status: 'Open',
  },
  {
    id: 'REQ-105',
    unit: 'Block A · 105',
    resident: 'S. Raghavan',
    category: 'Access Control',
    description: 'Intercom handset and gate tag synchronization',
    status: 'Resolved',
  },
];

export const ApartmentDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<UnitTicket[]>(INITIAL_UNIT_TICKETS);

  const advanceStatus = (id: string) => {
    const order: UnitTicket['status'][] = ['Open', 'In Progress', 'Resolved'];
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: order[(order.indexOf(t.status) + 1) % order.length] }
          : t
      )
    );
  };

  return (
    <div className="mt-5 border border-[#D5D5D5] bg-white text-[#18181B] rounded-[8px] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#E4E4E7] bg-[#FAFAFA] flex items-center justify-between text-[12.5px]">
        <span className="font-semibold text-[#09090B]">
          Resident Maintenance Requests
        </span>
        <span className="text-[11.5px] text-[#71717A]">
          Click status to update work order
        </span>
      </div>
      <div className="divide-y divide-[#E4E4E7] text-[12.5px]">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFAFA]"
          >
            <div>
              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-semibold text-[#09090B]">{t.unit}</span>
                <span className="text-[#71717A]">·</span>
                <span className="text-[#3F3F46]">{t.resident}</span>
                <span className="text-[#71717A]">·</span>
                <span className="text-[#71717A]">{t.category}</span>
              </div>
              <p className="text-[#52525B] mt-0.5">{t.description}</p>
            </div>
            <button
              type="button"
              onClick={() => advanceStatus(t.id)}
              className={`px-2.5 py-1 rounded-[4px] border text-[11.5px] font-medium shrink-0 ${
                t.status === 'Resolved'
                  ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]'
                  : t.status === 'In Progress'
                  ? 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]'
                  : 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]'
              }`}
            >
              {t.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

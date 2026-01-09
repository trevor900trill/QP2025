import { Zap, Shield, Globe, BarChart3, Users, DollarSign, Activity, Lock } from "lucide-react";

export function AuthSidePanel() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-[#0a1f16] flex items-center justify-center p-10">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

            {/* Ambient Glows */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] h-[150%] w-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent blur-3xl" />

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
            </div>

            {/* 3D Tilted Card Container */}
            <div className="relative z-10 transform rotate-y-12 rotate-x-6 perspective-1000 transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 group">
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 max-w-md w-full overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Content */}
                    <div className="relative z-20 flex flex-col gap-8 text-white">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/20 shadow-inner">
                                    <Activity className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight text-white">System Status</h3>
                                    <p className="text-sm text-emerald-100/60 font-medium">All systems operational</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/30" />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-emerald-300" />
                                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Active Users</span>
                                </div>
                                <div className="text-2xl font-bold text-white">24.5k</div>
                                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                                    <span>+12%</span>
                                    <span className="text-white/40">this month</span>
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-4 h-4 text-emerald-300" />
                                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Revenue</span>
                                </div>
                                <div className="text-2xl font-bold text-white">$1.2M</div>
                                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                                    <span>+8%</span>
                                    <span className="text-white/40">vs last year</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive List */}
                        <div className="space-y-3">
                            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider pl-1">Recent Activity</div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-blue-500/20 rounded-lg">
                                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                                    </div>
                                    <span className="text-sm text-white/90">New region deployed</span>
                                </div>
                                <span className="text-[10px] text-white/50">2m ago</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-purple-500/20 rounded-lg">
                                        <Shield className="w-3.5 h-3.5 text-purple-400" />
                                    </div>
                                    <span className="text-sm text-white/90">Security audit passed</span>
                                </div>
                                <span className="text-[10px] text-white/50">1h ago</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 p-4 bg-emerald-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl animate-bounce-slow">
                    <Zap className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="absolute -bottom-6 -left-6 p-4 bg-emerald-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl animate-pulse-slow">
                    <Lock className="w-6 h-6 text-emerald-400" />
                </div>

            </div>

            <div className="absolute bottom-8 flex items-center gap-2 opacity-50">
                <div className="h-px w-8 bg-emerald-500/50" />
                <span className="text-xs font-medium text-emerald-100 tracking-[0.2em] uppercase">Enterprise Ready</span>
                <div className="h-px w-8 bg-emerald-500/50" />
            </div>
        </div>
    );
}

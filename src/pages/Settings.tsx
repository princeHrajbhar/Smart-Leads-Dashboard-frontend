import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Shield, Bell } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

export const Settings: React.FC = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { user } = useAuthStore();

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <SettingsIcon className="w-8 h-8 text-primary-600" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardBody>
                            <div className="flex items-center space-x-3 mb-4">
                                <User className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Profile
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{user?.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{user?.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Role
                                    </label>
                                    <p className="text-gray-900 dark:text-white">{user?.role}</p>
                                </div>
                                <Button variant="secondary" size="sm">
                                    Edit Profile
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                {/* Appearance Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardBody>
                            <div className="flex items-center space-x-3 mb-4">
                                <Shield className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Appearance
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Dark Mode
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Toggle between light and dark themes
                                        </p>
                                    </div>
                                    <Button
                                        variant={isDarkMode ? "primary" : "secondary"}
                                        size="sm"
                                        onClick={toggleTheme}
                                    >
                                        {isDarkMode ? 'Dark' : 'Light'}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardBody>
                            <div className="flex items-center space-x-3 mb-4">
                                <Bell className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Notifications
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email Notifications
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Enabled
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Push Notifications
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive push notifications in browser
                                        </p>
                                    </div>
                                    <Button variant="secondary" size="sm">
                                        Disabled
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardBody>
                            <div className="flex items-center space-x-3 mb-4">
                                <Shield className="w-5 h-5 text-primary-600" />
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Security
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <Button variant="secondary" size="sm">
                                    Change Password
                                </Button>
                                <Button variant="secondary" size="sm">
                                    Two-Factor Authentication
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
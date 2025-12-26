"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveLMSConfig, getLMSConfig } from "@/lib/lms-integration";

export default function LMSConfig() {
  const { user } = useAuth();
  const [config, setConfig] = useState({
    platform: "moodle",
    enabled: false,
    credentials: {
      baseUrl: "",
      username: "",
      password: "",
      apiKey: "",
    },
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) {
      loadConfig();
    }
  }, [user]);

  const loadConfig = async () => {
    const savedConfig = await getLMSConfig(user.email);
    if (savedConfig) {
      setConfig(savedConfig);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveLMSConfig(user.email, config);
      alert("LMS configuration saved successfully!");
    } catch (error) {
      alert("Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>LMS Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Platform</label>
          <select
            value={config.platform}
            onChange={(e) => setConfig({ ...config, platform: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="moodle">Moodle</option>
            <option value="canvas">Canvas</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Base URL</label>
          <input
            type="url"
            value={config.credentials.baseUrl}
            onChange={(e) =>
              setConfig({
                ...config,
                credentials: { ...config.credentials, baseUrl: e.target.value },
              })
            }
            placeholder="https://your-lms.com"
            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {config.platform === "moodle" ? (
          <>
            <div>
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={config.credentials.username}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    credentials: { ...config.credentials, username: e.target.value },
                  })
                }
                placeholder="Enter Moodle username"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={config.credentials.password}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    credentials: { ...config.credentials, password: e.target.value },
                  })
                }
                placeholder="Enter Moodle password"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block mb-2 text-sm font-medium">API Key</label>
            <input
              type="password"
              value={config.credentials.apiKey}
              onChange={(e) =>
                setConfig({
                  ...config,
                  credentials: { ...config.credentials, apiKey: e.target.value },
                })
              }
              placeholder="Enter Canvas API key"
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
            id="lms-enabled"
            className="w-4 h-4 rounded border-input"
          />
          <label htmlFor="lms-enabled" className="text-sm font-medium cursor-pointer">
            Enable LMS Integration
          </label>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Configuration"}
        </Button>
      </CardContent>
    </Card>
  );
}
